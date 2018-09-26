var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { State } from '../../../core';
import ImmutableSet from '../../common/dataStructure/immutableSet';
export class JobState extends State {
    constructor(storeEvent, _lstJobSource) {
        super(storeEvent);
        this._lstJobSource = _lstJobSource;
        this._lstJobs = new ImmutableSet((item) => item.id, []);
    }
    onLoad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = data || [];
        });
    }
    onSave(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._lstJobs;
        });
    }
    updateJobs(data) {
        console.log('updateJobsddd', data);
        this._lstJobSource.next(new ImmutableSet((item) => item.id, data));
    }
}
//# sourceMappingURL=jobState.js.map