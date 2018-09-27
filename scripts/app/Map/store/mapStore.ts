import { Store } from '../../../core/index'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { MapState, DirectionCoordinate } from './MapState'
import Position from '../model/postion'

export class MapStore extends Store<MapState> {
    private readonly _destinationPositionSource: BehaviorSubject<Position> = new BehaviorSubject({
        latitude: 35.78825,
        longitude: -120.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    public readonly destinationPostion: Observable<Position> = this._destinationPositionSource.asObservable()

    private readonly _currentPositionSource: BehaviorSubject<Position> = new BehaviorSubject({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    public readonly currentPostion: Observable<Position> = this._currentPositionSource.asObservable()
    public readonly currentAddress: Observable<string> = this.destinationPostion.map(e => e.name)

    private readonly _directionSource: BehaviorSubject<DirectionCoordinate[]> = new BehaviorSubject([])
    public readonly direction: Observable<DirectionCoordinate[]> = this._directionSource.asObservable()

    protected onCreateState(storeEvent: StoreEvent): MapState {
        return new MapState(storeEvent, this._currentPositionSource, this._destinationPositionSource, this._directionSource)
    }
}