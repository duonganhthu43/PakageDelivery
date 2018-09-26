var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Action, StoreFactory } from '../../../core/index';
import { TasksStore } from '../../TaskList/store/tasksStore';
export default class UpdateTaskListAction extends Action {
    constructor(processingJob) {
        super();
        this.processingJob = processingJob;
    }
    getStore() {
        return StoreFactory.get(TasksStore);
    }
    execute(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayTask = [];
            this.processingJob.forEach(job => {
                arrayTask.push(Object.assign({}, job.pickup, { type: 'pickup' }));
                arrayTask.push(Object.assign({}, job.delivery, { type: 'delivery' }));
            });
            state.updateAssinedTask(arrayTask);
        });
    }
}
//# sourceMappingURL=updateTaskListAction.js.map