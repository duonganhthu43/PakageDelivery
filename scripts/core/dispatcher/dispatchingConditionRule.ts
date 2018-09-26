import IAction from '../actions/action`'
import IDispatchItem from './dispatchItem`'
import DispatchingRule from './dispatchingRule'

export default abstract class DispatchingConditionRule<
    T1 extends IAction<any>,
    T2 extends IAction<any>> extends DispatchingRule {
    constructor(
        firstType: new (...args) => T1,
        nextType: new (...args) => T2,
        protected condition: (existedItem: T1, potentialItem: T2) => boolean) {
        super(firstType, nextType)
    }

    protected onMatch(potentialItem: IDispatchItem, existedItem: IDispatchItem) {
        if (this.condition(<T1>existedItem.action, <T2>potentialItem.action))
            this.onMatchCondition(potentialItem, existedItem)
    }

    protected abstract onMatchCondition(potentialItem: IDispatchItem, existedItem: IDispatchItem)
}