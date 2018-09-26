import { Component } from 'react';
import { AppState } from 'react-native';
import { Subscription } from 'rxjs/Rx';
import { asyncScheduler } from 'rxjs';
import { StoreFactory } from '../../core';
class WeakRefAction {
    constructor(resolve, reject, onCancel) {
        this.resolve = resolve;
        this.reject = reject;
        this.onCancel = onCancel;
    }
    dispose() {
        this.resolve = this.reject = this.onCancel = undefined;
    }
}
export default class ComponentBase extends Component {
    constructor() {
        super(...arguments);
        this._actionPromises = [];
        this._subscribers = [];
        this._subscription = new Subscription();
        this._appState = AppState.currentState;
        this.componentMounted = false;
        this.onStateChange = (value) => console.warn(this.constructor.name + ' ' + value);
        this._handleAppStateChange = (nextAppState) => {
            if (this._appState.match(/inactive|background/) && nextAppState === 'active')
                this.onResume();
            this._appState = nextAppState;
        };
    }
    componentWillMount() {
        this.componentMounted = true;
        this._subscribers = this.onSubscribe();
        if (this._subscribers)
            this._subscribers.forEach(e => e.observable && this._subscription.add(e.observable.observeOn(asyncScheduler).subscribe(data => this.setState(prev => e.update && e.update(prev, data)))));
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        while (this._actionPromises.length > 0)
            this._actionPromises.pop().dispose();
        this._subscribers = [];
        this._subscription.unsubscribe();
        StoreFactory.save();
        this.componentMounted = false;
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    startAction(action, onCancel) {
        return new Promise((resolve, reject) => {
            const handler = new WeakRefAction(resolve, reject, onCancel);
            this._actionPromises.push(handler);
            action.start()
                .then(result => handler.resolve && handler.resolve(result))
                .catch(error => {
                // handle error here
            });
        });
    }
    onResume() {
        // resume the app
    }
}
//# sourceMappingURL=componentBase.js.map