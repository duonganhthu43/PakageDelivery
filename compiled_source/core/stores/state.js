var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AsyncDataProvider from './asyncDataProvider';
export default class State {
    constructor(dataEvent) {
        this._lastChanged = new Date();
        dataEvent.addOnLoad(() => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.dataProvider().loadData();
            yield this.onLoad(data);
            this._lastChanged = new Date();
        }));
        dataEvent.addOnSave(() => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.onSave(this._lastChanged);
            if (data != undefined) {
                this._lastChanged = new Date();
                return yield this.dataProvider().saveData(data);
            }
        }));
        dataEvent.addOnDispose(this.onDispose.bind(this));
    }
    dataProvider() {
        return this._dataProvider || (this._dataProvider = new AsyncDataProvider(this.storageKey()));
    }
    storageKey() {
        return this.constructor.name;
    }
    onDispose() {
        return this.dataProvider().clear();
    }
}
//# sourceMappingURL=state.js.map