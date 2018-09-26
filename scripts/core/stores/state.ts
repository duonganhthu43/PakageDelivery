import StoreEvent from './storeEvent'
import IDataProvider from './dataProvider`'
import AsyncDataProvider from './asyncDataProvider'

export default abstract class State {
    private _dataProvider: IDataProvider
    private _lastChanged: Date = new Date()

    constructor(dataEvent: StoreEvent) {
        dataEvent.addOnLoad(async () => {
            const data = await this.dataProvider().loadData()
            await this.onLoad(data)
            this._lastChanged = new Date()
        })

        dataEvent.addOnSave(async () => {
            const data = await this.onSave(this._lastChanged)
            if (data != undefined) {
                this._lastChanged = new Date()
                return await this.dataProvider().saveData(data)
            }
        })

        dataEvent.addOnDispose(this.onDispose.bind(this))
    }

    protected dataProvider(): IDataProvider {
        return this._dataProvider || (this._dataProvider = new AsyncDataProvider(this.storageKey()))
    }

    protected storageKey() {
        return this.constructor.name
    }

    protected abstract onLoad(data: any): Promise<void>

    protected abstract onSave(lastChange: Date): Promise<any>

    protected onDispose(): Promise<void> {
        return this.dataProvider().clear()
    }
}