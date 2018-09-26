export default class ImmutableSet {
    constructor(_fKey, items) {
        this._fKey = _fKey;
        this.source = {};
        this.createdTime = new Date();
        if (items)
            items.forEach(e => {
                if (e)
                    this.source[_fKey(e)] = e;
            });
    }
    merge(item, onlyUpdate) {
        return !item ? this : this.mergeAll([item], onlyUpdate);
    }
    mergeAll(items, onlyUpdate) {
        let newSet;
        if (items instanceof Array && items.length > 0)
            items.forEach(e => {
                const key = e && this._fKey(e);
                if (key && (!onlyUpdate || this.source[key])) {
                    if (!newSet) {
                        newSet = new ImmutableSet(this._fKey);
                        newSet.source = Object.assign({}, this.source);
                    }
                    newSet.source[key] = e;
                }
            });
        return newSet ? newSet : this;
    }
    remove(...items) {
        return !items ? this : this.removeAll(items.map(e => e));
    }
    removeAll(items) {
        let newSet;
        if (items instanceof Array && items.length > 0)
            items.forEach(e => {
                const key = e && this._fKey(e);
                if (key && this.source[key]) {
                    if (!newSet) {
                        newSet = new ImmutableSet(this._fKey);
                        newSet.source = Object.assign({}, this.source);
                    }
                    delete newSet.source[key];
                }
            });
        return newSet ? newSet : this;
    }
    forEach(callbackfn) {
        if (callbackfn)
            for (const e of this.keys())
                if (callbackfn(this.source[e], e) === false)
                    return;
    }
    filter(filterFn) {
        const items = [];
        if (this.filter)
            for (const e of this.keys()) {
                const val = this.source[e];
                if (filterFn(val, e))
                    items.push(val);
            }
        return items;
    }
    findByKey(key) {
        return this.source[key];
    }
    findByKeys(keys) {
        const items = [];
        if (keys)
            for (const e of keys)
                if (this.containsKey(e))
                    items.push(this.source[e]);
        return items;
    }
    map(callbackfn) {
        return this.keys().map(e => callbackfn(this.source[e], e));
    }
    toArray() {
        return this.keys().map(e => this.source[e]);
    }
    hasChanged(lastChange) {
        return lastChange && this.createdTime > lastChange;
    }
    contains(item) {
        return item && this.source[this._fKey(item)];
    }
    containsKey(key) {
        return this.source.hasOwnProperty(key);
    }
    keys() {
        return Object.keys(this.source);
    }
    size() {
        return this.keys().length;
    }
    isEmpty() {
        return this.size() === 0;
    }
}
//# sourceMappingURL=immutableSet.js.map