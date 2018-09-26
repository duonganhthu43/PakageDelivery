import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import { TaskDetail } from '../model/task'

export class TasksState extends State {
    private _assignedTasks: [TaskDetail]
    private _unAssignedTasks: [TaskDetail]

    constructor(storeEvent: StoreEvent,
        private readonly _assignedTasksSource: BehaviorSubject<[TaskDetail]>,
        private readonly _unAssignedTasksSource: BehaviorSubject<[TaskDetail]>,
    ) {
        super(storeEvent)
    }

    protected async onLoad(data: any): Promise<void> {
        data = data || []
    }

    protected async onSave(_: Date): Promise<any> {
        return this._assignedTasks
    }

    public updateAssinedTask(data: [TaskDetail] ) {
        console.log( 'updateAssinedTask ', data)
        this._assignedTasksSource.next(this._assignedTasks = data)
    }

    public updateUnAssinedTask(data: [TaskDetail] ) {
        this._unAssignedTasksSource.next(this._unAssignedTasks = data)
    }
}
