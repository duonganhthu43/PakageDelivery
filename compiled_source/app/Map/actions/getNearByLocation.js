var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Action, StoreFactory } from '../../../core/index';
import RequestHelper from '../../common/utilities/requestHelper';
import { urlsHelper } from '../../common/urlsHelper';
import { TasksStore } from '../../TaskList/store/tasksStore';
export default class GetNearByLocationAction extends Action {
    constructor(location) {
        super();
        this.location = location;
    }
    getStore() {
        return StoreFactory.get(TasksStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.NearbySearch}`, {
                location: `${this.location.latitude},${this.location.longitude}`,
                type: 'hospital',
                rankby: 'distance',
                key: urlsHelper.Google.Key
            });
            let arrayTask = data.results.map(e => {
                let position = { place_id: e.place_id, latitude: e.geometry.location.lat, longitude: e.geometry.location.lng };
                return position;
            });
            let arrayId = data.results.map(e => {
                return e.place_id;
            });
            let urlDistance = `${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Distance}`;
            urlDistance += '?';
            urlDistance += `origins=place_id:${this.location.place_id}`;
            urlDistance += '&';
            urlDistance += `destinations=place_id:${arrayId.join('|place_id:')}`;
            urlDistance += '&';
            urlDistance += `key=${urlsHelper.Google.Key}`;
            console.log('ListDistance ', urlDistance);
            let dataDistance = yield RequestHelper.get(urlDistance);
            console.log('ListDistance ', dataDistance);
        });
    }
}
//# sourceMappingURL=getNearByLocation.js.map