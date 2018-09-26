import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import { Job } from '../model/job'
import ImmutableSet from '../../common/dataStructure/immutableSet'

export class JobState extends State {

    private _lstJobs: ImmutableSet<Job> = new ImmutableSet<Job>((item) => item.id, [])

    constructor(storeEvent: StoreEvent,
        private readonly _lstJobSource: BehaviorSubject<ImmutableSet<Job>>,
    ) {
        super(storeEvent)
    }

    protected async onLoad(data: any): Promise<void> {
        data = data || []
    }

    protected async onSave(_: Date): Promise<any> {
        return this._lstJobs
    }

    public updateJobs(data: Job[]) {
        console.log('updateJobsddd', data)
        this._lstJobSource.next(new ImmutableSet<Job>((item) => item.id, data))
    }
}
