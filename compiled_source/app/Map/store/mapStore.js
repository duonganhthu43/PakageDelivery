import { Store } from '../../../core/index';
import { BehaviorSubject } from 'rxjs';
import { MapState } from './MapState';
export class MapStore extends Store {
    constructor() {
        super(...arguments);
        this._destinationPositionSource = new BehaviorSubject({
            latitude: 35.78825,
            longitude: -120.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        this.destinationPostion = this._destinationPositionSource.asObservable();
        this._currentPositionSource = new BehaviorSubject({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        this.currentPostion = this._currentPositionSource.asObservable();
        this.currentAddress = this.currentPostion.map(e => e.name);
        this._directionSource = new BehaviorSubject([]);
        this.direction = this._directionSource.asObservable();
    }
    onCreateState(storeEvent) {
        return new MapState(storeEvent, this._currentPositionSource, this._destinationPositionSource, this._directionSource);
    }
}
//# sourceMappingURL=mapStore.js.map