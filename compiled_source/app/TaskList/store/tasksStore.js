import { Store } from '../../../core';
import { BehaviorSubject } from 'rxjs';
import { TasksState } from './tasksState';
export class TasksStore extends Store {
    constructor() {
        super(...arguments);
        this._assignedTaskSource = new BehaviorSubject([]);
        this.assignedTaskObservable = this._assignedTaskSource.asObservable();
    }
    onCreateState(storeEvent) {
        return new TasksState(storeEvent, this._assignedTaskSource);
    }
}
//# sourceMappingURL=tasksStore.js.map