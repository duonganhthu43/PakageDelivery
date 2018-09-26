
import State from '../stores/state'
import IActionBase from './actionBase`'

export default interface IAction<S extends State> extends IActionBase {
    onDispatching(state: S): void
    execute(state: S): Promise<any>
    onRetry(retriedTimes?: number, error?: any): number | void
}