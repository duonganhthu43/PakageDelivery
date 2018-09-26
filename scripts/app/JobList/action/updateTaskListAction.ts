import { Action, Store, StoreFactory } from '../../../core/index'
import { TasksState } from '../../TaskList/store/tasksState'
import { TasksStore } from '../../TaskList/store/tasksStore'
import { Job } from '../model/job'
import { TaskDetail } from '../../TaskList/model/task'

export default class UpdateTaskListAction extends Action<TasksState> {
    constructor(readonly processingJob: Job[]) {
        super()
    }
    protected getStore(): Store<TasksState> {
        return StoreFactory.get(TasksStore)
    }

    public async execute(state: TasksState): Promise<any> {
        const arrayTask: TaskDetail[] = []
        this.processingJob.forEach(job => {
            arrayTask.push({...job.pickup, type: 'pickup'})
            arrayTask.push({...job.delivery, type: 'delivery'})
        })
        state.updateAssinedTask(arrayTask)
    }
}
