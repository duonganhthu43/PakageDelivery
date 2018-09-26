import React from 'react'
import { ListView, View } from 'react-native'
import TaskSumaryComponent from './taskSumaryComponent'
import ComponentBase from '../common/componentBase'
import { SubscriberInfo } from '../common/dataStructure/subscriberInfo'
import { TasksStore } from './store/tasksStore'
import { StoreFactory } from '../../core'
import { TaskDetail } from './model/task'

export default class TaskListComponent extends ComponentBase<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }

    protected onSubscribe(): SubscriberInfo<[TaskDetail], any>[] {
        return [
            new SubscriberInfo<[TaskDetail], any>(
                StoreFactory.get(TasksStore).assignedTaskObservable, (prev, taskArray) => {
                    return { ...prev, dataSource: taskArray }
                })
        ]
    }
    render() {
        console.log('TaskListComponent render', this.state.dataSource)
        return (
            this.state.dataSource ?
            <ListView
                style={{ flex: 1 }}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
            /> : <View></View>
        )
    }

    renderRow = (rowData: TaskDetail) => {
        console.log('renderRow render', rowData)

        return (
            <TaskSumaryComponent title={rowData.generalInfo.title} description={'4.1km from your location'} totalTime={'23 mins without traffic'} isSelected={false}></TaskSumaryComponent>
        )
    }
}