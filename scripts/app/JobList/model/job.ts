import { TaskDetail } from '../../TaskList/model/task'

export class Job {
    public readonly id: string
    constructor(public readonly name: string, public readonly pickup: TaskDetail, public readonly delivery: TaskDetail, public readonly status: string = 'new') {
        this.id = `${pickup.generalInfo.placeId}-${delivery.generalInfo.placeId}`
    }
}