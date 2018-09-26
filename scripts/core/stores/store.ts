import IAction from '../actions/action`'
import IDispatcher from '../dispatcher/dispatcher`'
import State from './state'
import StoreEvent from './storeEvent'
import Dispatcher from '../dispatcher/dispatcher'
import IDispatchingRule from '../dispatcher/dispatchingRule`'

export default abstract class Store<S extends State>  {
    protected state: S
    protected isReady: Promise<S>
    protected readonly events = new StoreEvent()
    protected dispatcher: IDispatcher

    constructor() {
        this.isReady = new Promise(resolve => setImmediate(() => this.initialize(resolve)))
    }

    protected async initialize(resolve: (value?: any) => void) {
        // console.log(`Initilize ${this.constructor.name}`)

        this.state = this.onCreateState(this.events)

        this.dispatcher = this.onCreateDispatcher(this.events);
        (this.onSetupDispatchingRule() || []).forEach(e => this.dispatcher.addRule(e))

        await this.events.fireOnInitialize()
        resolve(this.state)

        setTimeout(() => this.resume())
    }

    protected abstract onCreateState(storeEvent: StoreEvent): S
    protected onCreateDispatcher(storeEvent: StoreEvent): IDispatcher {
         return new Dispatcher(storeEvent, this.constructor.name + 'Dispatcher', this.state)
    }
    protected onSetupDispatchingRule(): IDispatchingRule[] {
        return undefined
    }

    public save() {
        this.events.fireOnSave()
    }

    public dispose() {
        this.events.fireOnDispose()
    }

    public async resume() {
        await this.isReady
        this.dispatcher.resume()
    }

    public async dispatch(action: IAction<S>): Promise<any> {
        const state = await this.isReady
        action.onDispatching(state)
        return await this.dispatcher.dispatch(action)
    }
}