var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StoreEvent from './storeEvent';
import Dispatcher from '../dispatcher/dispatcher';
export default class Store {
    constructor() {
        this.events = new StoreEvent();
        this.isReady = new Promise(resolve => setImmediate(() => this.initialize(resolve)));
    }
    initialize(resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`Initilize ${this.constructor.name}`)
            this.state = this.onCreateState(this.events);
            this.dispatcher = this.onCreateDispatcher(this.events);
            (this.onSetupDispatchingRule() || []).forEach(e => this.dispatcher.addRule(e));
            yield this.events.fireOnInitialize();
            resolve(this.state);
            setTimeout(() => this.resume());
        });
    }
    onCreateDispatcher(storeEvent) {
        return new Dispatcher(storeEvent, this.constructor.name + 'Dispatcher', this.state);
    }
    onSetupDispatchingRule() {
        return undefined;
    }
    save() {
        this.events.fireOnSave();
    }
    dispose() {
        this.events.fireOnDispose();
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isReady;
            this.dispatcher.resume();
        });
    }
    dispatch(action) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = yield this.isReady;
            action.onDispatching(state);
            return yield this.dispatcher.dispatch(action);
        });
    }
}
//# sourceMappingURL=store.js.map