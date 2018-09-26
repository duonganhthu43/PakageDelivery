import IDispatcher from './dispatcher`'
import IDispatchItem from './dispatchItem`'
import IDispatchingRule from './dispatchingRule`'
import IAction from '../actions/action`'
import State from '../stores/state'
import StoreEvent from '../stores/storeEvent'
import { JsonHelper } from './jsonHelper'

declare type ActionClass = IAction<any>

function _buildMessage(prefix: string, item: DispatchItem) {
    return `${Dispatcher.name}.${prefix} ${item.id} ${item.action.constructor.name}`
}
function _log(_: string, _i: DispatchItem) {
    // console.log(_buildMessage(prefix, item))
}

function _createCancelMessage(item: DispatchItem) {
    return new CancelMessage(_buildMessage('Canceled', item))
}

export class CancelMessage {
    constructor(public readonly message) {
    }
}

class DispatchItem implements IDispatchItem {
    public id = Math.random().toString(16).substring(2)
    public isCancel: boolean
    public hasNextIds: boolean
    public isExecuting?: boolean  // [null]: ready [false]: pending [true]: executing
    public retriedTimes: number = -1
    public previousIds = {}

    constructor(
        public action: ActionClass,
        public resolve?: (value: any) => void,
        public reject?: (reason: any) => void) { }

    public after(item: IDispatchItem): void {
        const impl = <DispatchItem>item
        impl.hasNextIds = true
        this.previousIds[impl.id] = true
    }
}

export default class Dispatcher extends State implements IDispatcher {
    private _allItems = {}
    private _rules: IDispatchingRule[] = []
    private _hasChanges = {}
    private _isDisposing = false

    constructor(storeEvent: StoreEvent, private readonly _storageKey: string, private readonly _state: State) {
        super(storeEvent)
    }

    protected storageKey() {
        return this._storageKey
    }

    protected async onLoad(data: any): Promise<void> {
        this._allItems = JsonHelper.deserialize(data) || {}
        for (const e in this._allItems)
            this._allItems[e].isExecuting = false
    }

    protected async onSave(): Promise<any> {
        if (Object.keys(this._hasChanges).length > 0) {
            this._hasChanges = {}
            const data = {}
            for (const e in this._allItems) {
                const item = this._allItems[e]
                if (JsonHelper.isJsonSerialize(item.action))
                    data[e] = item
            }
            return data
        }
    }

    public addRule(rule: IDispatchingRule) {
        this._rules.push(rule)
    }

    public async dispatch(action: ActionClass): Promise<any> {
        return this._isDisposing ?
            Promise.reject(`${this.constructor.name} is disposing!`) :
            await new Promise(
                async (resolve, reject) => {
                    const potentialItem = new DispatchItem(action, resolve, reject)
                    this._processRules(potentialItem)

                    if (potentialItem.isCancel)
                        reject(_createCancelMessage(potentialItem))
                    else {
                        this._addItem(potentialItem)
                        this._processItem(potentialItem)
                    }
                })
    }

    public resume() {
        if (this._isDisposing)
            return

        for (const e in this._allItems) {
            const item = this._allItems[e]
            if (!item.isExecuting)
                item.isExecuting = undefined
        }
        this._processRecursive()
    }

    public _processRecursive() {
        for (const e in this._allItems)
            this._processItem(this._allItems[e])
    }

    private async _processItem(item: DispatchItem, isRetry?: boolean) {
        if (!isRetry && !this._isReady(item))
            return

        item.isExecuting = true
        setTimeout(async () => {
            try {
                _log('Proccess ', item)
                if (item.isCancel)
                    throw _createCancelMessage(item)

                const stateContext = this._createStateContext(item)
                const result = await item.action.execute(stateContext)
                this._resolveItem(item, result)

            } catch (error) {
                const miliSeconds = error instanceof CancelMessage ? undefined : item.action.onRetry(++item.retriedTimes, error)
                if (miliSeconds >= 0) {
                    _log(`Retry ${miliSeconds}`, item)
                    setTimeout(() => this._processItem(item, true), miliSeconds)
                } else if (miliSeconds < 0) {
                    _log('Pending', item)
                    item.isExecuting = false
                } else { // undifined || void
                    _log(`Exeption ${(error && error.message)}` || error, item)
                    this._rejectItem(item, error)
                }
            } finally {
                this._processRecursive()
            }
        })
    }

    private _isReady(item: DispatchItem): boolean {
        if (item.isExecuting !== undefined)
            return false

        const preIds = Object.keys(item.previousIds)
        for (const e of preIds) {
            const prevItem = this._allItems[e]
            if (!prevItem)
                delete item.previousIds[e]
            else if (prevItem.isCancel && prevItem.isExecuting === false)
                this._rejectItem(prevItem, _createCancelMessage(prevItem))
            else
                return false
        }

        return true
    }

    private _processRules(potentialItem: DispatchItem) {
        if (this._rules.length > 0)
            for (const e of Object.keys(this._allItems))
                for (const rule of this._rules) {
                    rule.execute(potentialItem, this._allItems[e])
                    if (potentialItem.isCancel)
                        return
                }
    }

    private _createStateContext(item: DispatchItem): any {
        const context = {}
        const state = this._state
        for (const inst of [state, state.constructor.prototype])
            for (const e of Object.getOwnPropertyNames(inst)) {
                const meth = state[e]
                if (typeof meth === 'function') {
                    context[e] = function (...args) {
                        if (this._isDisposing)
                            throw new Error(`${this.constructor.name} is disposing!`)
                        else if (item.isCancel)
                            throw _createCancelMessage(item)
                        return meth.apply(state, args)
                    }
                }
            }
        return context
    }

    private _resolveItem(item: DispatchItem, result: any) {
        if (item.resolve)
            item.resolve(result)
        this._removeItem(item)
    }

    private _rejectItem(item: DispatchItem, error: any) {
        if (item.reject)
            item.reject(error)
        this._removeItem(item)
    }

    private _addItem(item: DispatchItem) {
        if (JsonHelper.isJsonSerialize(item.action))
            this._hasChanges[item.id] = true

        this._allItems[item.id] = item
    }
    private _removeItem(item: DispatchItem) {
        _log('Completed ', item)
        if (JsonHelper.isJsonSerialize(item.action)) {
            if (this._hasChanges[item.id])
                delete this._hasChanges[item.id]
            else
                this._hasChanges[item.id] = true
        }

        delete this._allItems[item.id]
    }

    protected onDispose(): Promise<void> {
        this._isDisposing = true
        return super.onDispose()
    }
}