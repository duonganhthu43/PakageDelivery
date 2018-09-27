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
export default class UpdateDestinationAction extends Action {
    constructor(destination) {
        super();
        this.destination = destination;
    }
    getStore() {
        return StoreFactory.get(MapStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            state.updateDestinationPosition(this.destination);
        });
    }
}
//# sourceMappingURL=updateDestination.js.map