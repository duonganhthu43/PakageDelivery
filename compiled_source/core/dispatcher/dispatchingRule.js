import { Error } from 'tslint/lib/error';
export default class DispatchingRule {
    constructor(...types) {
        this.types = {};
        let index = 0;
        function addType(t) {
            const typeName = t.prototype.constructor.name;
            if (this.types[typeName])
                throw new Error(`${typeName} was duplicated on ${this.constructor.name}`);
            else
                this.types[typeName] = index;
        }
        if (types)
            for (const e of types) {
                index++;
                if (e instanceof Array)
                    e.forEach(t => addType.bind(this)(t));
                else
                    addType.bind(this)(e);
            }
    }
    execute(potentialItem, existedItem) {
        const potentialIndex = this.getClassIndex(potentialItem);
        if (potentialIndex > -1 || existedItem.isCancel) {
            const index = this.getClassIndex(existedItem);
            if (index > -1
                && (index < potentialIndex
                    || existedItem.action.constructor.name === potentialItem.action.constructor.name))
                this.onMatch(potentialItem, existedItem);
        }
    }
    getClassIndex(item) {
        return this.types[item.action.constructor.name] || -1;
    }
}
//# sourceMappingURL=dispatchingRule.js.map