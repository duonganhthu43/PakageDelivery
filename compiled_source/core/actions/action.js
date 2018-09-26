export default class Action {
    start() {
        return this.getStore().dispatch(this);
    }
    onDispatching(state) {
        state = state; // dummy
    }
    // return miliseconds for next retry
    onRetry(retriedTimes, error) {
        error = error; // dummy
        retriedTimes = retriedTimes; // dummy
    }
}
//# sourceMappingURL=action.js.map