import { Store } from '../../../core/index'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { MapState } from './MapState'
import Position from '../model/postion'

export class MapStore extends Store<MapState> {
    private readonly _currentPositionSource: BehaviorSubject<Position> = new BehaviorSubject({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    public readonly currentPostion: Observable<Position> = this._currentPositionSource.asObservable()

    protected onCreateState(storeEvent: StoreEvent): MapState {
        return new MapState(storeEvent, this._currentPositionSource)
    }
}