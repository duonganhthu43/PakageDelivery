var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Action, StoreFactory } from '../../../core/index';
import { MapStore } from '../store/mapStore';
import RequestHelper from '../../common/utilities/requestHelper';
import { urlsHelper } from '../../common/urlsHelper';
import Polyline from '@mapbox/polyline';
export default class GetDirectionAction extends Action {
    constructor(origin, destination) {
        super();
        this.origin = origin;
        this.destination = destination;
    }
    getStore() {
        return StoreFactory.get(MapStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.origin || !this.destination || !this.origin.place_id || !this.destination.place_id) {
                return;
            }
            let urlDirection = `${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Direction}`;
            urlDirection += '?';
            urlDirection += `origin=place_id:${this.origin.place_id}`;
            urlDirection += '&';
            urlDirection += `destination=place_id:${this.destination.place_id}`;
            urlDirection += '&';
            urlDirection += `key=${urlsHelper.Google.Key}`;
            let result = yield RequestHelper.get(urlDirection);
            let points = Polyline.decode(result.routes[0].overview_polyline.points);
            let directionPoints = points.map(e => {
                return {
                    latitude: e[0],
                    longitude: e[1]
                };
            });
            directionPoints.push({ latitude: this.destination.latitude, longitude: this.destination.longitude });
            directionPoints.unshift({ latitude: this.origin.latitude, longitude: this.origin.longitude });
            state.updateDirection(directionPoints);
        });
    }
}
//# sourceMappingURL=getDirection.js.map