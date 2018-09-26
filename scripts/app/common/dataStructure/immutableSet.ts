export default class ImmutableSet<T>  {
    protected source: object = {}
    protected readonly createdTime = new Date()

    constructor(private _fKey: (item: T) => string, items?: T[]) {
        if (items)
            items.forEach(e => {
                if (e)
                    this.source[_fKey(e)] = e
            })
    }

    public merge(item: T, onlyUpdate?: boolean) {
        return !item ? this : this.mergeAll([item], onlyUpdate)
    }

    public mergeAll(items: T[], onlyUpdate?: boolean) {
        let newSet: ImmutableSet<T>

        if (items instanceof Array && items.length > 0)
            items.forEach(e => {
                const key = e && this._fKey(e)
                if (key && (!onlyUpdate || this.source[key])) {
                    if (!newSet) {
                        newSet = new ImmutableSet<T>(this._fKey)
                        newSet.source = { ...this.source }
                    }
                    newSet.source[key] = e
                }
            })

        return newSet ? newSet : this
    }

    public remove(...items: T[]): ImmutableSet<T> {
        return !items ? this : this.removeAll(items.map(e => e))
    }

    public removeAll(items: T[]): ImmutableSet<T> {
        let newSet: ImmutableSet<T>

        if (items instanceof Array && items.length > 0)
            items.forEach(e => {
                const key = e && this._fKey(e)
                if (key && this.source[key]) {
                    if (!newSet) {
                        newSet = new ImmutableSet<T>(this._fKey)
                        newSet.source = { ...this.source }
                    }
                    delete newSet.source[key]
                }
            })

        return newSet ? newSet : this
    }

    public forEach(callbackfn: (val: T, key?: string) => void | boolean): void {
        if (callbackfn)
            for (const e of this.keys())
                if (callbackfn(this.source[e], e) === false)
                    return
    }

    public filter(filterFn: (val: T, key?: string) => boolean): T[] {
        const items = []
        if (this.filter)
            for (const e of this.keys()) {
                const val = this.source[e]
                if (filterFn(val, e))
                    items.push(val)
            }
        return items
    }

    public findByKey(key: string): T {
        return this.source[key]
    }

    public findByKeys(keys: string[]): T[] {
        const items = []
        if (keys)
            for (const e of keys)
                if (this.containsKey(e))
                    items.push(this.source[e])
        return items
    }

    public map(callbackfn: (val: T, key?: string) => T): T[] {
        return this.keys().map(e => callbackfn(this.source[e], e))
    }

    public toArray(): T[] {
        return this.keys().map(e => this.source[e])
    }

    public hasChanged(lastChange: Date): boolean {
        return lastChange && this.createdTime > lastChange
    }

    public contains(item: T): boolean {
        return item && this.source[this._fKey(item)]
    }

    public containsKey(key: string) {
        return this.source.hasOwnProperty(key)
    }

    public keys(): string[] {
        return Object.keys(this.source)
    }

    public size(): number {
        return this.keys().length
    }

    public isEmpty(): boolean {
        return this.size() === 0
    }
}