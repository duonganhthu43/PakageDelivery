import IAction from '../actions/action`'
import DispatchingRule from './dispatchingRule'
import IDispatchItem from './dispatchItem`'
import DispatchingConditionRule from './dispatchingConditionRule'
declare type ActionClass = IAction<any>

export class SequenceRule extends DispatchingRule {
    protected onMatch(potentialItem: IDispatchItem, existedItem: IDispatchItem): void {
        potentialItem.after(existedItem)
    }
}
export class SequenceConditionRule<T1 extends ActionClass, T2 extends ActionClass> extends DispatchingConditionRule<T1, T2> {
    protected onMatchCondition(potentialItem: IDispatchItem, existedItem: IDispatchItem) {
        potentialItem.after(existedItem)
    }
}

export class CancelDispatchingRule extends DispatchingRule {
    protected onMatch(potentialItem: IDispatchItem, existedItem: IDispatchItem): void {
        potentialItem.isCancel = true
        existedItem.isCancel = existedItem.isCancel // Dummy
    }
}
export class CancelDispatchingConditionRule<T1 extends ActionClass, T2 extends ActionClass> extends DispatchingConditionRule<T1, T2> {
    protected onMatchCondition(potentialItem: IDispatchItem, existedItem: IDispatchItem) {
        potentialItem.isCancel = true
        existedItem.isCancel = existedItem.isCancel // Dummy
    }
}

export class CancelExecutingRule extends DispatchingRule {
    protected onMatch(potentialItem: IDispatchItem, existedItem: IDispatchItem): void {
        existedItem.isCancel = true
        potentialItem.isCancel = potentialItem.isCancel // Dummy
    }
}
export class CancelExecutingConditionRule<T1 extends ActionClass, T2 extends ActionClass> extends DispatchingConditionRule<T1, T2> {
    protected onMatchCondition(potentialItem: IDispatchItem, existedItem: IDispatchItem) {
        existedItem.isCancel = true
        potentialItem.isCancel = potentialItem.isCancel // Dummy
    }
}