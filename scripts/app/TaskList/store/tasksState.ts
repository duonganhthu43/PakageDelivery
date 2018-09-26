import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import { Task } from '../model/task'

export class TasksState extends State {
    private _assignedTasks: [Task]
    private _unAssignedTasks: [Task]

    constructor(storeEvent: StoreEvent,
        private readonly _assignedTasksSource: BehaviorSubject<[Task]>,
        private readonly _unAssignedTasksSource: BehaviorSubject<[Task]>,
    ) {
        super(storeEvent)
    }

    protected async onLoad(data: any): Promise<void> {
        data = data || []
    }

    protected async onSave(_: Date): Promise<any> {
        return this._assignedTasks
    }

    public updateAssinedTask(data: [Task] ) {
        this._assignedTasksSource.next(this._assignedTasks = data)
    }

    public updateUnAssinedTask(data: [Task] ) {
        this._unAssignedTasksSource.next(this._unAssignedTasks = data)
    }
}
