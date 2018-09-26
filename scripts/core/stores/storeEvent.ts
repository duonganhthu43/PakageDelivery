enum Events { Init, Save, Dispose }

export default class StoreEvent {
    private _events = {}

    public addOnLoad(listener: () => Promise<void>) {
        this._addEvent(Events.Init, listener)
    }
    public fireOnInitialize(): Promise<any> {
        return this._fireEvent(Events.Init)
    }

    public addOnSave(listener: () => Promise<void>) {
        this._addEvent(Events.Save, listener)
    }
    public fireOnSave(): Promise<any> {
        return this._fireEvent(Events.Save)
    }

    public addOnDispose(listener: () => Promise<void>) {
        this._addEvent(Events.Dispose, listener)
    }
    public fireOnDispose(): Promise<any> {
        return this._fireEvent(Events.Dispose)
    }

    private _addEvent(eventName: Events, listener: () => Promise<any>) {
        const listners = this._events[eventName] || (this._events[eventName] = [])
        listners.push(listener)
    }
    private _fireEvent(eventName: Events): Promise<any> {
        const listners = this._events[eventName]
        return listners instanceof Array ?
            Promise.all(listners.map(e => e())) : Promise.resolve(undefined)
    }
}