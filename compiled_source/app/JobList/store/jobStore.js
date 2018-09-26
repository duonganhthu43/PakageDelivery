import { Store } from '../../../core/index';
import { BehaviorSubject } from 'rxjs';
import { JobState } from './jobState';
import ImmutableSet from '../../common/dataStructure/immutableSet';
export class JobStore extends Store {
    constructor() {
        super(...arguments);
        this._jobLstSource = new BehaviorSubject(new ImmutableSet(item => item.id, []));
        this.jobLst = this._jobLstSource.asObservable();
        this.jobByStatus = this.jobLst.map(jobs => {
            const result = {};
            jobs.forEach(j => { result[j.status].merge(j); });
            return result;
        });
        this.newJobs = this.jobByStatus.map(dictionary => {
            return dictionary.new;
        });
        this.processingJobs = this.jobByStatus.map(dictionary => {
            return dictionary.processing;
        });
    }
    onCreateState(storeEvent) {
        return new JobState(storeEvent, this._jobLstSource);
    }
}
//# sourceMappingURL=jobStore.js.map