import { AsyncStorage } from 'react-native'
import IDataProvider from './dataProvider`'

export default class AsyncDataProvider implements IDataProvider {
    constructor(private _key: string) { }

    public async loadData(): Promise<any> {
        try {
            const text = await AsyncStorage.getItem(this._key)
            return JSON.parse(text)
        } catch (ex) {
            return undefined
        }
    }

    public async saveData(data: any): Promise<void> {
        const text = JSON.stringify(data)
        return AsyncStorage.setItem(this._key, text)
    }

    public clear(): Promise<void> {
        return AsyncStorage.removeItem(this._key)
    }
}