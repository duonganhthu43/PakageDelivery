import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { StoreFactory } from '../../../core';
import { JobStore } from '../../JobList/store/jobStore';
import { MapStore } from '../../Map/store/mapStore';
import { TasksStore } from '../../TaskList/store/tasksStore';
import ComponentBase from '../../common/componentBase';
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo';
import UpdateTaskListAction from '../../JobList/action/updateTaskListAction';
import MyStatusBar from '../../common/statusbar';
import MapComponent from '../../Map/ui/mapComponent';
import TaskListComponent from '../../TaskList/TaskListComponent';
StoreFactory.registerNoDispose(JobStore, MapStore, TasksStore);
export class AssigmentComponent extends ComponentBase {
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
        const positionMarker = require('@images/PositionMarker.png');
        return (React.createElement(View, { style: { flex: 1, flexDirection: 'column', backgroundColor: '#243B53' } },
            React.createElement(MyStatusBar, { barStyle: 'light-content' }),
            React.createElement(View, { style: styles.header },
                React.createElement(Text, { style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }, "Dashboard")),
            React.createElement(View, { style: [styles.header, { backgroundColor: '#1C3147' }] },
                React.createElement(View, { style: {
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    } },
                    React.createElement(Image, { style: { marginRight: 10 }, source: positionMarker }),
                    React.createElement(Text, { style: { color: 'white', fontSize: 17 } }, this.state && this.state.currentAddress))),
            React.createElement(View, { style: { flex: 3, backgroundColor: 'skyblue' } },
                React.createElement(MapComponent, null)),
            React.createElement(View, { style: { flex: 2, backgroundColor: 'white' } },
                React.createElement(ScrollView, { style: { flex: 2 } },
                    React.createElement(TaskListComponent, null)),
                React.createElement(View, { style: {
                        backgroundColor: 'white',
                        height: 50,
                        borderColor: '#4CD964',
                        borderWidth: 1,
                        borderRadius: 25,
                        margin: 5,
                        flexDirection: 'row'
                    } },
                    React.createElement(TouchableOpacity, { style: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            borderRadius: 25,
                            backgroundColor: '#4CD964'
                        } },
                        React.createElement(Text, { style: { fontSize: 16, color: 'white' } }, "Assignment")),
                    React.createElement(TouchableOpacity, { style: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 10
                        } },
                        React.createElement(Text, { style: { fontSize: 16, color: '#4CD964' } }, "JobQueue"))))));
    }
}
const styles = StyleSheet.create({
    header: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//# sourceMappingURL=assigmentComponent.js.map