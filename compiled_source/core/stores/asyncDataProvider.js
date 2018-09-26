var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncStorage } from 'react-native';
export default class AsyncDataProvider {
    constructor(_key) {
        this._key = _key;
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = yield AsyncStorage.getItem(this._key);
                return JSON.parse(text);
            }
            catch (ex) {
                return undefined;
            }
        });
    }
    saveData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = JSON.stringify(data);
            return AsyncStorage.setItem(this._key, text);
        });
    }
    clear() {
        return AsyncStorage.removeItem(this._key);
    }
}
//# sourceMappingURL=asyncDataProvider.js.map