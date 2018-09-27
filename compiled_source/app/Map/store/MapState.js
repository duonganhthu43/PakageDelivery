var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { State } from '../../../core';
export class MapState extends State {
    constructor(storeEvent, _currentPostionSource, _destinationPostionSource, _directionSource) {
        super(storeEvent);
        this._currentPostionSource = _currentPostionSource;
        this._destinationPostionSource = _destinationPostionSource;
        this._directionSource = _directionSource;
    }
    onLoad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = data || [];
        });
    }
    onSave(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._currentPosition;
        });
    }
    getCurrentPosition() {
        return this._currentPosition;
    }
    updateCurrentPosition(data) {
        this._currentPostionSource.next(this._currentPosition = data);
    }
    updateDestinationPosition(data) {
        this._destinationPostionSource.next(this._destinationPosition = data);
    }
    updateDirection(data) {
        this._directionSource.next(this._direction = data);
    }
}
//# sourceMappingURL=MapState.js.map