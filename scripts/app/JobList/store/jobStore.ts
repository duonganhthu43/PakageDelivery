import { Store } from '../../../core/index'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { JobState } from './jobState'
import { Job } from '../model/job'
import ImmutableSet from '../../common/dataStructure/immutableSet'

export class JobStore extends Store<JobState> {
    private readonly _jobLstSource: BehaviorSubject<ImmutableSet<Job>> = new BehaviorSubject(new ImmutableSet<Job>(item => item.id, []))
    public readonly jobLst: Observable<ImmutableSet<Job>> = this._jobLstSource.asObservable()

    public readonly jobByStatus: Observable<{ [status: string]: ImmutableSet<Job> }> =
        this.jobLst.map(jobs => {
            const result: { [status: string]: ImmutableSet<Job> } = {}
            jobs.forEach(j => {
                result[j.status] = !result[j.status] ? new ImmutableSet<Job>(item => item.id, [j]) : result[j.status].merge(j)
            })
            return result
        })

    public readonly newJobs: Observable<ImmutableSet<Job>> = this.jobByStatus.map(dictionary => {
        return dictionary.new
    })

    public readonly processingJobs: Observable<ImmutableSet<Job>> = this.jobByStatus.map(dictionary => {
        return dictionary.processing
    })

    protected onCreateState(storeEvent: StoreEvent): JobState {
        return new JobState(storeEvent, this._jobLstSource)
    }
}