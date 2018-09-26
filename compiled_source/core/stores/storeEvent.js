var Events;
(function (Events) {
    Events[Events["Init"] = 0] = "Init";
    Events[Events["Save"] = 1] = "Save";
    Events[Events["Dispose"] = 2] = "Dispose";
})(Events || (Events = {}));
export default class StoreEvent {
    constructor() {
        this._events = {};
    }
    addOnLoad(listener) {
        this._addEvent(Events.Init, listener);
    }
    fireOnInitialize() {
        return this._fireEvent(Events.Init);
    }
    addOnSave(listener) {
        this._addEvent(Events.Save, listener);
    }
    fireOnSave() {
        return this._fireEvent(Events.Save);
    }
    addOnDispose(listener) {
        this._addEvent(Events.Dispose, listener);
    }
    fireOnDispose() {
        return this._fireEvent(Events.Dispose);
    }
    _addEvent(eventName, listener) {
        const listners = this._events[eventName] || (this._events[eventName] = []);
        listners.push(listener);
    }
    _fireEvent(eventName) {
        const listners = this._events[eventName];
        return listners instanceof Array ?
            Promise.all(listners.map(e => e())) : Promise.resolve(undefined);
    }
}
//# sourceMappingURL=storeEvent.js.map