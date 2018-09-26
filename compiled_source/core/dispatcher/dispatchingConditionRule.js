import DispatchingRule from './dispatchingRule';
export default class DispatchingConditionRule extends DispatchingRule {
    constructor(firstType, nextType, condition) {
        super(firstType, nextType);
        this.condition = condition;
    }
    onMatch(potentialItem, existedItem) {
        if (this.condition(existedItem.action, potentialItem.action))
            this.onMatchCondition(potentialItem, existedItem);
    }
}
//# sourceMappingURL=dispatchingConditionRule.js.map