import { AppState } from 'react-native'
import Store from './store'

declare type S = Store<any>

class Instance<T extends S> {
    private _instance: T
    private readonly _isDisposable: boolean
    constructor(private _creator: () => T, isDisposable: boolean) {
        this._isDisposable = isDisposable
    }

    public get(): T {
        if (!this._instance)
            this._instance = this._creator()
        return this._instance
    }

    public save() {
        if (this._instance)
            this._instance.save()
    }

    public dispose() {
        if (this._instance && this._isDisposable) {
            const temp = this._instance
            this._instance = null
            temp.dispose()
        }
    }
}

let stores: { [key: string]: Instance<any> } = {}
const onAppStateChange = (value) => {
    if (value === 'background')
        StoreFactory.save()
}

export default class StoreFactory {

    public static register(storeClass: new () => S, isDisposable) {
        if (Object.keys(stores).length === 0)
            AppState.addEventListener('change', onAppStateChange)

        let creator = () => { return new storeClass() }
        StoreFactory.registerWithCreator(storeClass, creator, isDisposable)
    }

    public static registerNoDispose(...storeClasses: (new () => S)[]) {
        storeClasses.forEach(storeClass => this.register(storeClass, false))
    }

    public static registerDisposable(...storeClasses: (new () => S)[]) {
        storeClasses.forEach(storeClass => this.register(storeClass, true))
    }

    public static registerWithCreator<T extends S>(storeClass: new (...args) => T, creator: () => T, isDisposable: boolean) {
        stores[storeClass.name] = new Instance(creator, isDisposable)
    }

    public static get<T extends S>(storeClass: new (...args) => T): T {
        return stores[storeClass.name].get()
    }

    public static save() {
        for (const e of StoreFactory.allStoreNames())
            stores[e].save()
    }

    public static dispose() {
        for (const e of StoreFactory.allStoreNames())
            stores[e].dispose()

        AppState.removeEventListener('change', onAppStateChange)
    }

    public static allStoreNames(): string[] {
        return Object.keys(stores)
    }

    private constructor() { }
}
