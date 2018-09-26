import IAction from '../actions/action`'

export default interface IDispatchItem {
    action: IAction<any>
    isCancel: boolean
    after(item: IDispatchItem)
}
