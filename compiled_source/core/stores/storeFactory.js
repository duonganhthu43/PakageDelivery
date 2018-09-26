import { AppState } from 'react-native';
class Instance {
    constructor(_creator, isDisposable) {
        this._creator = _creator;
        this._isDisposable = isDisposable;
    }
    get() {
        if (!this._instance)
            this._instance = this._creator();
        return this._instance;
    }
    save() {
        if (this._instance)
            this._instance.save();
    }
    dispose() {
        if (this._instance && this._isDisposable) {
            const temp = this._instance;
            this._instance = null;
            temp.dispose();
        }
    }
}
let stores = {};
const onAppStateChange = (value) => {
    if (value === 'background')
        StoreFactory.save();
};
export default class StoreFactory {
    static register(storeClass, isDisposable) {
        if (Object.keys(stores).length === 0)
            AppState.addEventListener('change', onAppStateChange);
        let creator = () => { return new storeClass(); };
        StoreFactory.registerWithCreator(storeClass, creator, isDisposable);
    }
    static registerNoDispose(...storeClasses) {
        storeClasses.forEach(storeClass => this.register(storeClass, false));
    }
    static registerDisposable(...storeClasses) {
        storeClasses.forEach(storeClass => this.register(storeClass, true));
    }
    static registerWithCreator(storeClass, creator, isDisposable) {
        stores[storeClass.name] = new Instance(creator, isDisposable);
    }
    static get(storeClass) {
        return stores[storeClass.name].get();
    }
    static save() {
        for (const e of StoreFactory.allStoreNames())
            stores[e].save();
    }
    static dispose() {
        for (const e of StoreFactory.allStoreNames())
            stores[e].dispose();
        AppState.removeEventListener('change', onAppStateChange);
    }
    static allStoreNames() {
        return Object.keys(stores);
    }
    constructor() { }
}
//# sourceMappingURL=storeFactory.js.map