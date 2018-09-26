import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import { TaskDetail } from '../model/task'

export class TasksState extends State {
    private _assignedTasks: TaskDetail[]

    constructor(storeEvent: StoreEvent,
        private readonly _assignedTasksSource: BehaviorSubject<TaskDetail[]>
    ) {
        super(storeEvent)
    }

    protected async onLoad(data: any): Promise<void> {
        data = data || []
    }

    protected async onSave(_: Date): Promise<any> {
        return this._assignedTasks
    }

    public updateAssinedTask(data: TaskDetail[] ) {
        this._assignedTasksSource.next(this._assignedTasks = data)
    }
}
