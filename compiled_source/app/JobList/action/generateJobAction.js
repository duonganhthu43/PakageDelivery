var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Action, StoreFactory } from '../../../core/index';
import { JobStore } from '../store/jobStore';
import GetNearByLocationAction from '../../Map/actions/getNearByLocation';
import { Job } from '../model/job';
export default class GenerateJobAction extends Action {
    constructor(position) {
        super();
        this.position = position;
    }
    getStore() {
        return StoreFactory.get(JobStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const lstTask = yield new GetNearByLocationAction(this.position).start();
            let lstJob = [];
            // generate 20 job
            lstTask.forEach((element, idx) => {
                let pickupTask = element;
                let deliveryTask = lstTask[this.randomExcluded(0, 19, idx)];
                lstJob.push(new Job('Sample Job ' + idx, pickupTask, deliveryTask, idx < 2 ? 'processing' : 'new'));
            });
            state.updateJobs(lstJob);
        });
    }
    randomExcluded(min, max, excluded) {
        let n = Math.floor(Math.random() * (max - min) + min);
        if (n === excluded)
            return this.randomExcluded(min, max, excluded);
        return n;
    }
}
//# sourceMappingURL=generateJobAction.js.map