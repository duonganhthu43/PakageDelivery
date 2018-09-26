import { Action, Store, StoreFactory } from '../../../core/index'
import { JobState } from '../store/jobState'
import { JobStore } from '../store/jobStore'
import Position from '../../Map/model/postion'
import GetNearByLocationAction from '../../Map/actions/getNearByLocation'
import { Job } from '../model/job'

export default class GenerateJobAction extends Action<JobState> {
    constructor(readonly position: Position) { super() }
    protected getStore(): Store<JobState> {
        return StoreFactory.get(JobStore)
    }

    public async execute(state: JobState): Promise<any> {
        console.log('GenerateJobAction execute')
        const lstTask = await new GetNearByLocationAction(this.position).start()
        console.log('GenerateJobAction2 execute', lstTask)

        let lstJob: Job[] = []
        // generate 20 job
        lstTask.forEach((element, idx) => {
            let pickupTask = element
            let deliveryTask = lstTask[this.randomExcluded(0, 19, idx)]
            lstJob.push(new Job('Sample Job ' + idx, pickupTask, deliveryTask, idx < 2 ? 'processing' : 'new'))
        })
        console.log('lstJob toUpdate', lstJob)

        state.updateJobs(lstJob)
    }

    private randomExcluded(min, max, excluded) {
        let n = Math.floor(Math.random() * (max - min) + min)
        if (n === excluded) return this.randomExcluded(min, max, excluded)
        return n
    }
}
