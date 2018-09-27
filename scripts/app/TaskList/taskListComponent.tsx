import React from 'react'
import { ListView, View } from 'react-native'
import TaskSumaryComponent from './taskSumaryComponent'
import ComponentBase from '../common/componentBase'
import { SubscriberInfo } from '../common/dataStructure/subscriberInfo'
import { TasksStore } from './store/tasksStore'
import { StoreFactory } from '../../core'
import { TaskDetail } from './model/task'
import UpdateDestinationAction from '../Map/actions/updateDestination'

export default class TaskListComponent extends ComponentBase<any, any> {
    ds = new ListView.DataSource({ rowHasChanged: (r1: TaskDetail, r2: TaskDetail) => r1.generalInfo.placeId !== r2.generalInfo.placeId })

    constructor(props) {
        super(props)
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
        }
    }

    protected onSubscribe(): SubscriberInfo<TaskDetail[], any>[] {
        return [
            new SubscriberInfo<TaskDetail[], any>(
                StoreFactory.get(TasksStore).assignedTaskObservable, (prev, taskArray) => {
                    if (!taskArray || taskArray.length < 1) return this.state

                    let sortedArray = taskArray.sort((a: TaskDetail, b: TaskDetail) => { return a.distanceValue - b.distanceValue })
                    new UpdateDestinationAction(sortedArray[0].position).start()
                    return { ...prev, dataSource: this.ds.cloneWithRows(sortedArray) }
                })
        ]
    }
    render() {
        return (
            this.state.dataSource ?
                <ListView
                    style={{ flex: 1 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                    enableEmptySections={true}
                /> : <View></View>
        )
    }

    renderRow = (rowData: TaskDetail, sectionID: string | number, rowID: any) => {
        return (
            <TaskSumaryComponent title={rowData.generalInfo.title} description={rowData.generalInfo.distanceText} totalTime={`${rowData.generalInfo.durationText}`}
                distance={rowData.distanceValue} isSelected={rowID - 1 < 0} type={rowData.type}></TaskSumaryComponent>
        )
    }
}