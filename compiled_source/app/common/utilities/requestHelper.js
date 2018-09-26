var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class RequestHelper {
    static _getQueryString(params) {
        if (!params)
            return '';
        let queries = [];
        for (const p in params) {
            queries.push(`${p}=${encodeURIComponent(params[p])}`);
        }
        return '?' + queries.join('&');
    }
    static get(resource, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = RequestHelper._getQueryString(params);
            console.log('REQUEAST : ', `${resource}${queryString}`);
            const result = yield fetch(`${resource}${queryString}`, {
                method: 'GET'
            });
            return result && result.json();
        });
    }
}
//# sourceMappingURL=requestHelper.js.map