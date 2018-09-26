import IDispatchingRule from './dispatchingRule`'
import IAction from '../actions/action`'

export default interface IDispatcher {
    addRule(rule: IDispatchingRule): void
	resume(): void
    dispatch(action: IAction<any>): Promise<any>
}