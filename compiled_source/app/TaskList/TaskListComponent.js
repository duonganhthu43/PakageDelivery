import React from 'react';
import { ListView, View } from 'react-native';
import TaskSumaryComponent from './taskSumaryComponent';
import ComponentBase from '../common/componentBase';
import { SubscriberInfo } from '../common/dataStructure/subscriberInfo';
import { TasksStore } from './store/tasksStore';
import { StoreFactory } from '../../core';
import UpdateDestinationAction from '../Map/actions/updateDestination';
export default class TaskListComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.generalInfo.placeId !== r2.generalInfo.placeId });
        this.renderRow = (rowData, sectionID, rowID) => {
            return (React.createElement(TaskSumaryComponent, { title: rowData.generalInfo.title, description: rowData.generalInfo.distanceText, totalTime: `${rowData.generalInfo.durationText}`, distance: rowData.distanceValue, isSelected: rowID - 1 < 0, type: rowData.type }));
        };
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
        };
    }
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(TasksStore).assignedTaskObservable, (prev, taskArray) => {
                if (!taskArray || taskArray.length < 1)
                    return this.state;
                let sortedArray = taskArray.sort((a, b) => { return a.distanceValue - b.distanceValue; });
                new UpdateDestinationAction(sortedArray[0].position).start();
                return Object.assign({}, prev, { dataSource: this.ds.cloneWithRows(sortedArray) });
            })
        ];
    }
    render() {
        return (this.state.dataSource ?
            React.createElement(ListView, { style: { flex: 1 }, dataSource: this.state.dataSource, renderRow: (rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID), enableEmptySections: true }) : React.createElement(View, null));
    }
}
//# sourceMappingURL=TaskListComponent.js.map