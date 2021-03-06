var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { State } from '../../../core';
export class TasksState extends State {
    constructor(storeEvent, _assignedTasksSource) {
        super(storeEvent);
        this._assignedTasksSource = _assignedTasksSource;
    }
    onLoad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = data || [];
        });
    }
    onSave(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._assignedTasks;
        });
    }
    updateAssinedTask(data) {
        this._assignedTasksSource.next(this._assignedTasks = data);
    }
}
//# sourceMappingURL=tasksState.js.map