import { Store } from '../../../core/index';
import { BehaviorSubject } from 'rxjs';
import { MapState } from './MapState';
export class TasksStore extends Store {
    constructor() {
        super(...arguments);
        this._currentPositionSource = new BehaviorSubject({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        this.currentPostion = this._currentPositionSource.asObservable();
    }
    onCreateState(storeEvent) {
        return new MapState(storeEvent, this._currentPositionSource);
    }
}
//# sourceMappingURL=taskStore.js.map