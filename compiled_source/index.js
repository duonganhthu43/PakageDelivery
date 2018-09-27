import * as React from 'react';
import { AppRegistry, View } from 'react-native';
import { StoreFactory } from './core';
import { MapStore } from './app/Map/store/mapStore';
import MyStatusBar from './app/common/statusbar';
import { TasksStore } from './app/TaskList/store/tasksStore';
import { JobStore } from './app/JobList/store/jobStore';
import ComponentBase from './app/common/componentBase';
import { SubscriberInfo } from './app/common/dataStructure/subscriberInfo';
import UpdateTaskListAction from './app/JobList/action/updateTaskListAction';
import { DashBoardComponent } from './app/dashboard/ui/dashboardComponent';
StoreFactory.registerNoDispose(JobStore, MapStore, TasksStore);
export class App extends ComponentBase {
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(JobStore).processingJobs, (prev, processingJob) => {
                new UpdateTaskListAction(processingJob).start();
                return this.state;
            }),
            new SubscriberInfo(StoreFactory.get(MapStore).currentAddress, (prev, address) => {
                return Object.assign({}, prev, { currentAddress: address });
            })
        ];
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, flexDirection: 'column', backgroundColor: '#243B53' } },
            React.createElement(MyStatusBar, { barStyle: 'light-content' }),
            React.createElement(DashBoardComponent, null)));
    }
}
AppRegistry.registerComponent('PackageDelivery', () => App);
//# sourceMappingURL=index.js.map