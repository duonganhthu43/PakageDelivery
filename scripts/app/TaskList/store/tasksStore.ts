import { Store } from '../../../core'
import { BehaviorSubject, Observable } from 'rxjs'
import StoreEvent from '../../../core/stores/storeEvent'
import { TasksState } from './tasksState'
import { TaskDetail } from '../model/task'

export class TasksStore extends Store<TasksState> {
    private readonly _assignedTaskSource: BehaviorSubject<TaskDetail[]> = new BehaviorSubject([])
    public readonly assignedTaskObservable: Observable<TaskDetail[]> = this._assignedTaskSource.asObservable()

    protected onCreateState(storeEvent: StoreEvent): TasksState {
        return new TasksState(storeEvent, this._assignedTaskSource)
    }
}