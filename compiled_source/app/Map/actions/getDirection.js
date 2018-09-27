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
import { Polyline } from 'react-native-maps';
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
            let result = yield RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Direction}`, {
                origin: `place_id:${this.origin.place_id}`,
                destination: `place_id:${this.destination.place_id}`,
                key: urlsHelper.Google.Key
            });
            console.log('GetDirectionAction ', result);
            let points = Polyline.decode();
            //state.updateCurrentPosition(position)
            //new GenerateJobAction(position).start()
        });
    }
}
//# sourceMappingURL=getDirection.js.map