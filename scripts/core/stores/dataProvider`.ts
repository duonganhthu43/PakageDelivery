export default interface IDataProvider {
    loadData(): Promise<any>
    saveData(data: any): Promise<void>
    clear(): Promise<void>
}