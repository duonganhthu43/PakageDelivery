import { Store } from '../../../core'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { TasksState } from './tasksState'
import { Task } from '../model/task'

export class TasksStore extends Store<TasksState> {
    private readonly _assignedTaskSource: BehaviorSubject<[Task]> = new BehaviorSubject(undefined)
    public readonly assignedTaskObservable: Observable<[Task]> = this._assignedTaskSource.asObservable()

    private readonly _unAssignedTaskSource: BehaviorSubject<[Task]> = new BehaviorSubject(undefined)
    public readonly unAssignedTaskObservable: Observable<[Task]> = this._unAssignedTaskSource.asObservable()

    protected onCreateState(storeEvent: StoreEvent): TasksState {
        return new TasksState(storeEvent, this._assignedTaskSource, this._unAssignedTaskSource)
    }
}