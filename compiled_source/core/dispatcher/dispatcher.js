var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import State from '../stores/state';
import { JsonHelper } from './jsonHelper';
function _buildMessage(prefix, item) {
    return `${Dispatcher.name}.${prefix} ${item.id} ${item.action.constructor.name}`;
}
function _log(_, _i) {
    // console.log(_buildMessage(prefix, item))
}
function _createCancelMessage(item) {
    return new CancelMessage(_buildMessage('Canceled', item));
}
export class CancelMessage {
    constructor(message) {
        this.message = message;
    }
}
class DispatchItem {
    constructor(action, resolve, reject) {
        this.action = action;
        this.resolve = resolve;
        this.reject = reject;
        this.id = Math.random().toString(16).substring(2);
        this.retriedTimes = -1;
        this.previousIds = {};
    }
    after(item) {
        const impl = item;
        impl.hasNextIds = true;
        this.previousIds[impl.id] = true;
    }
}
export default class Dispatcher extends State {
    constructor(storeEvent, _storageKey, _state) {
        super(storeEvent);
        this._storageKey = _storageKey;
        this._state = _state;
        this._allItems = {};
        this._rules = [];
        this._hasChanges = {};
        this._isDisposing = false;
    }
    storageKey() {
        return this._storageKey;
    }
    onLoad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._allItems = JsonHelper.deserialize(data) || {};
            for (const e in this._allItems)
                this._allItems[e].isExecuting = false;
        });
    }
    onSave() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(this._hasChanges).length > 0) {
                this._hasChanges = {};
                const data = {};
                for (const e in this._allItems) {
                    const item = this._allItems[e];
                    if (JsonHelper.isJsonSerialize(item.action))
                        data[e] = item;
                }
                return data;
            }
        });
    }
    addRule(rule) {
        this._rules.push(rule);
    }
    dispatch(action) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._isDisposing ?
                Promise.reject(`${this.constructor.name} is disposing!`) :
                yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const potentialItem = new DispatchItem(action, resolve, reject);
                    this._processRules(potentialItem);
                    if (potentialItem.isCancel)
                        reject(_createCancelMessage(potentialItem));
                    else {
                        this._addItem(potentialItem);
                        this._processItem(potentialItem);
                    }
                }));
        });
    }
    resume() {
        if (this._isDisposing)
            return;
        for (const e in this._allItems) {
            const item = this._allItems[e];
            if (!item.isExecuting)
                item.isExecuting = undefined;
        }
        this._processRecursive();
    }
    _processRecursive() {
        for (const e in this._allItems)
            this._processItem(this._allItems[e]);
    }
    _processItem(item, isRetry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isRetry && !this._isReady(item))
                return;
            item.isExecuting = true;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    _log('Proccess ', item);
                    if (item.isCancel)
                        throw _createCancelMessage(item);
                    const stateContext = this._createStateContext(item);
                    const result = yield item.action.execute(stateContext);
                    this._resolveItem(item, result);
                }
                catch (error) {
                    const miliSeconds = error instanceof CancelMessage ? undefined : item.action.onRetry(++item.retriedTimes, error);
                    if (miliSeconds >= 0) {
                        _log(`Retry ${miliSeconds}`, item);
                        setTimeout(() => this._processItem(item, true), miliSeconds);
                    }
                    else if (miliSeconds < 0) {
                        _log('Pending', item);
                        item.isExecuting = false;
                    }
                    else {
                        _log(`Exeption ${(error && error.message)}` || error, item);
                        this._rejectItem(item, error);
                    }
                }
                finally {
                    this._processRecursive();
                }
            }));
        });
    }
    _isReady(item) {
        if (item.isExecuting !== undefined)
            return false;
        const preIds = Object.keys(item.previousIds);
        for (const e of preIds) {
            const prevItem = this._allItems[e];
            if (!prevItem)
                delete item.previousIds[e];
            else if (prevItem.isCancel && prevItem.isExecuting === false)
                this._rejectItem(prevItem, _createCancelMessage(prevItem));
            else
                return false;
        }
        return true;
    }
    _processRules(potentialItem) {
        if (this._rules.length > 0)
            for (const e of Object.keys(this._allItems))
                for (const rule of this._rules) {
                    rule.execute(potentialItem, this._allItems[e]);
                    if (potentialItem.isCancel)
                        return;
                }
    }
    _createStateContext(item) {
        const context = {};
        const state = this._state;
        for (const inst of [state, state.constructor.prototype])
            for (const e of Object.getOwnPropertyNames(inst)) {
                const meth = state[e];
                if (typeof meth === 'function') {
                    context[e] = function (...args) {
                        if (this._isDisposing)
                            throw new Error(`${this.constructor.name} is disposing!`);
                        else if (item.isCancel)
                            throw _createCancelMessage(item);
                        return meth.apply(state, args);
                    };
                }
            }
        return context;
    }
    _resolveItem(item, result) {
        if (item.resolve)
            item.resolve(result);
        this._removeItem(item);
    }
    _rejectItem(item, error) {
        if (item.reject)
            item.reject(error);
        this._removeItem(item);
    }
    _addItem(item) {
        if (JsonHelper.isJsonSerialize(item.action))
            this._hasChanges[item.id] = true;
        this._allItems[item.id] = item;
    }
    _removeItem(item) {
        _log('Completed ', item);
        if (JsonHelper.isJsonSerialize(item.action)) {
            if (this._hasChanges[item.id])
                delete this._hasChanges[item.id];
            else
                this._hasChanges[item.id] = true;
        }
        delete this._allItems[item.id];
    }
    onDispose() {
        this._isDisposing = true;
        return super.onDispose();
    }
}
//# sourceMappingURL=dispatcher.js.map