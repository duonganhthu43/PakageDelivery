import { Component } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { Subscription } from 'rxjs/Rx'
import { SubscriberInfo } from './dataStructure/subscriberInfo'
import { asyncScheduler } from 'rxjs'
import { StoreFactory, IActionBase } from '../../core'

class WeakRefAction {
	constructor(public resolve: (result) => void, public reject: (error) => void, public onCancel: (message: string) => void) { }
	public dispose() {
		this.resolve = this.reject = this.onCancel = undefined
	}
}

export default abstract class ComponentBase<PROPS, STATE> extends Component<PROPS, STATE> {
	private _actionPromises: WeakRefAction[] = []
	private _subscribers: SubscriberInfo<any, STATE>[] = []
	private _subscription: Subscription = new Subscription()
	private _appState: AppStateStatus = AppState.currentState

	protected componentMounted = false
	protected onStateChange = (value) => console.warn(this.constructor.name + ' ' + value)
	protected abstract onSubscribe(): SubscriberInfo<any, STATE>[]

	componentWillMount() {
		this.componentMounted = true
		this._subscribers = this.onSubscribe()
		if (this._subscribers)
			this._subscribers.forEach(e =>
				e.observable && this._subscription.add(
					e.observable.observeOn(asyncScheduler).subscribe(
						data => this.setState(prev => e.update && e.update(prev, data))
					))
			)
		AppState.addEventListener('change', this._handleAppStateChange)
	}

	componentWillUnmount() {
		while (this._actionPromises.length > 0)
			this._actionPromises.pop().dispose()

		this._subscribers = []
		this._subscription.unsubscribe()
		StoreFactory.save()

		this.componentMounted = false
		AppState.removeEventListener('change', this._handleAppStateChange)
	}

	protected startAction(action: IActionBase, onCancel?: (message: string) => void): Promise<any> {
		return new Promise((resolve, reject) => {
			const handler = new WeakRefAction(resolve, reject, onCancel)
			this._actionPromises.push(handler)

			action.start()
				.then(result => handler.resolve && handler.resolve(result))
				.catch(error => {
					// handle error here
				})
		})
	}

	private _handleAppStateChange = (nextAppState) => {
		if (this._appState.match(/inactive|background/) && nextAppState === 'active')
			this.onResume()
		this._appState = nextAppState
	}

	protected onResume() {
		// resume the app
	}
}