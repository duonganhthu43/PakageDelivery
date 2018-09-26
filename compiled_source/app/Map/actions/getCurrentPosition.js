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
import GenerateJobAction from '../../JobList/action/generateJobAction';
export default class GetCurrentPositon extends Action {
    getStore() {
        return StoreFactory.get(MapStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.SearchPlace}`, {
                input: 'Bitexco, VietNam',
                inputtype: 'textquery',
                fields: 'formatted_address,geometry,place_id',
                key: urlsHelper.Google.Key
            });
            console.log('GetCurrentPositon ', result);
            const latDelta = Number(result.candidates[0].geometry.viewport.northeast.lat) - Number(result.candidates[0].geometry.viewport.southwest.lat);
            const lngDelta = Number(result.candidates[0].geometry.viewport.northeast.lng) - Number(result.candidates[0].geometry.viewport.southwest.lng);
            const position = {
                latitude: result.candidates[0].geometry.location.lat,
                longitude: result.candidates[0].geometry.location.lng,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
                address: result.candidates[0].formatted_address,
                place_id: result.candidates[0].place_id
            };
            console.log('updateCurrentPosition ', position);
            state.updateCurrentPosition(position);
            new GenerateJobAction(position).start();
        });
    }
}
//# sourceMappingURL=getCurrentPosition.js.map