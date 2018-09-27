import { Action, Store, StoreFactory } from '../../../core/index'
import { MapState } from '../store/MapState'
import { MapStore } from '../store/mapStore'
import Position from '../model/postion'

export default class UpdateDestinationAction extends Action<MapState> {
    constructor(readonly destination: Position) { super() }

    protected getStore(): Store<MapState> {
        return StoreFactory.get(MapStore)
    }

    public async execute(state: MapState): Promise<any> {
        state.updateDestinationPosition(this.destination)
    }
}
