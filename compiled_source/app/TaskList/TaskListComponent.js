import React from 'react';
import { ListView, View } from 'react-native';
import TaskSumaryComponent from './taskSumaryComponent';
import ComponentBase from '../common/componentBase';
import { SubscriberInfo } from '../common/dataStructure/subscriberInfo';
import { TasksStore } from './store/tasksStore';
import { StoreFactory } from '../../core';
export default class TaskListComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.renderRow = (rowData) => {
            console.log('renderRow render', rowData);
            return (React.createElement(TaskSumaryComponent, { title: rowData.generalInfo.title, description: '4.1km from your location', totalTime: '23 mins without traffic', isSelected: false }));
        };
        this.state = {
            dataSource: []
        };
    }
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(TasksStore).assignedTaskObservable, (prev, taskArray) => {
                return Object.assign({}, prev, { dataSource: taskArray });
            })
        ];
    }
    render() {
        console.log('TaskListComponent render', this.state.dataSource);
        return (this.state.dataSource ?
            React.createElement(ListView, { style: { flex: 1 }, dataSource: this.state.dataSource, renderRow: (rowData) => this.renderRow(rowData) }) : React.createElement(View, null));
    }
}
//# sourceMappingURL=TaskListComponent.js.map