import DispatchingRule from './dispatchingRule';
import DispatchingConditionRule from './dispatchingConditionRule';
export class SequenceRule extends DispatchingRule {
    onMatch(potentialItem, existedItem) {
        potentialItem.after(existedItem);
    }
}
export class SequenceConditionRule extends DispatchingConditionRule {
    onMatchCondition(potentialItem, existedItem) {
        potentialItem.after(existedItem);
    }
}
export class CancelDispatchingRule extends DispatchingRule {
    onMatch(potentialItem, existedItem) {
        potentialItem.isCancel = true;
        existedItem.isCancel = existedItem.isCancel; // Dummy
    }
}
export class CancelDispatchingConditionRule extends DispatchingConditionRule {
    onMatchCondition(potentialItem, existedItem) {
        potentialItem.isCancel = true;
        existedItem.isCancel = existedItem.isCancel; // Dummy
    }
}
export class CancelExecutingRule extends DispatchingRule {
    onMatch(potentialItem, existedItem) {
        existedItem.isCancel = true;
        potentialItem.isCancel = potentialItem.isCancel; // Dummy
    }
}
export class CancelExecutingConditionRule extends DispatchingConditionRule {
    onMatchCondition(potentialItem, existedItem) {
        existedItem.isCancel = true;
        potentialItem.isCancel = potentialItem.isCancel; // Dummy
    }
}
//# sourceMappingURL=dispatchingRules.js.map