import React, { Component } from 'react'
import { Text, ListView, View } from 'react-native'
import TaskSumaryComponent from './taskSumaryComponent'

export default class TaskListComponent extends Component<any, any> {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row3', 'row4', 'row5']),
          }
    }
    render() {
        return (
            <ListView
             style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
            />
        )
    }

    renderRow = (rowData: any) => {
        return (
            <TaskSumaryComponent title='Wilhelminastraat' description={'4.1km from your location'} totalTime={'23 mins without traffic'} isSelected={false}></TaskSumaryComponent>
        )
    }
}