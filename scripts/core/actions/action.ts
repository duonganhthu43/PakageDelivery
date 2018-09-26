import IAction from './action`'
import State from '../stores/state'
import Store from '../stores/store'

export default abstract class Action<S extends State> implements IAction<S> {
    public start(): Promise<any> {
        return this.getStore().dispatch(this)
    }

    protected abstract getStore(): Store<S>

    public onDispatching(state: S): void {
        state = state                   // dummy
    }

    public abstract execute(state: S): Promise<any>

    // return miliseconds for next retry
    public onRetry(retriedTimes?: number, error?: any): number | void {
        error = error                  // dummy
        retriedTimes = retriedTimes    // dummy
    }
}