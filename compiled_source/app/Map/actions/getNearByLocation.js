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
                type: 'museum',
                rankby: 'distance',
                key: urlsHelper.Google.Key
            });
            let arrayPosition = data.results.map(e => {
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
            let dataDistanceResult = yield RequestHelper.get(urlDistance);
            let destinationAddress = dataDistanceResult.destination_addresses;
            let destinationInfo = dataDistanceResult.rows[0].elements;
            let destinationName = data.results.map(e => {
                return e.name;
            });
            let combinedData = this.zip([arrayId, destinationAddress, destinationName, destinationInfo, arrayPosition]);
            let combinedData2 = combinedData.map(e => {
                const task = {
                    title: 'Pickup at ' + e[2],
                    distanceText: e[3].distance.text + ' from your location',
                    durationText: e[3].duration.text + ' without traffic',
                    placeId: e[0]
                };
                return {
                    generalInfo: task,
                    position: e[4],
                    address: e[1],
                    name: e[2],
                    distanceValue: (Math.round((e[3].distance.value / 1000) * 10)) / 10
                };
            });
            state.updateAssinedTask(combinedData2);
            console.log('Combined data ', combinedData2);
        });
    }
    zip(arrays) {
        return arrays[0].map(function (_, i) {
            return arrays.map(function (array) { return array[i]; });
        });
    }
}
//# sourceMappingURL=getNearByLocation.js.map