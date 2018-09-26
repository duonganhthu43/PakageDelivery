import { Store } from '../../../core';
import { BehaviorSubject } from 'rxjs';
import { TasksState } from './tasksState';
export class TasksStore extends Store {
    constructor() {
        super(...arguments);
        this._assignedTaskSource = new BehaviorSubject(undefined);
        this.assignedTaskObservable = this._assignedTaskSource.asObservable();
        this._unAssignedTaskSource = new BehaviorSubject(undefined);
        this.unAssignedTaskObservable = this._unAssignedTaskSource.asObservable();
    }
    onCreateState(storeEvent) {
        return new TasksState(storeEvent, this._assignedTaskSource, this._unAssignedTaskSource);
    }
}
//# sourceMappingURL=tasksStore.js.map