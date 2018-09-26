import { Error } from 'tslint/lib/error'

import IDispatchingRule from './dispatchingRule`'
import IDispatchItem from './dispatchItem`'
import IAction from '../actions/action`'

declare type ActionClass = new (...args) => IAction<any>

export default abstract class DispatchingRule implements IDispatchingRule {
    protected types = {}

    constructor(...types: (ActionClass | ActionClass[])[]) {
        let index = 0
        function addType(t: ActionClass) {
            const typeName = t.prototype.constructor.name
            if (this.types[typeName])
                throw new Error(`${typeName} was duplicated on ${this.constructor.name}`)
            else
                this.types[typeName] = index
        }

        if (types)
            for (const e of types) {
                index++
                if (e instanceof Array)
                    e.forEach(t => addType.bind(this)(t))
                else
                    addType.bind(this)(e)
            }
    }

    public execute(potentialItem: IDispatchItem, existedItem: IDispatchItem): void {
        const potentialIndex = this.getClassIndex(potentialItem)
        if (potentialIndex > -1 || existedItem.isCancel) {
            const index = this.getClassIndex(existedItem)
            if (index > -1
                && (index < potentialIndex
                    || existedItem.action.constructor.name === potentialItem.action.constructor.name))
                this.onMatch(potentialItem, existedItem)
        }
    }

    protected abstract onMatch(potentialItem: IDispatchItem, existedItem: IDispatchItem): void

    protected getClassIndex(item: IDispatchItem): number {
        return this.types[item.action.constructor.name] || -1
    }
}