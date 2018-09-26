import IDispatchItem from './dispatchItem`'

export default interface IDispatchingRule {
    execute(potentialItem: IDispatchItem, existeditem: IDispatchItem): void
}