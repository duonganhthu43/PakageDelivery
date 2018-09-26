import { Store } from '../../../core'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { TasksState } from './tasksState'
import { TaskDetail } from '../model/task'

export class TasksStore extends Store<TasksState> {
    private readonly _assignedTaskSource: BehaviorSubject<[TaskDetail]> = new BehaviorSubject(undefined)
    public readonly assignedTaskObservable: Observable<[TaskDetail]> = this._assignedTaskSource.asObservable()

    private readonly _unAssignedTaskSource: BehaviorSubject<[TaskDetail]> = new BehaviorSubject(undefined)
    public readonly unAssignedTaskObservable: Observable<[TaskDetail]> = this._unAssignedTaskSource.asObservable()

    protected onCreateState(storeEvent: StoreEvent): TasksState {
        return new TasksState(storeEvent, this._assignedTaskSource, this._unAssignedTaskSource)
    }
}