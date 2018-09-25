import React, { Component } from 'react';
import { ListView } from 'react-native';
import TaskSumaryComponent from './taskSumaryComponent';
export default class TaskListComponent extends Component {
    constructor(props) {
        super(props);
        this.renderRow = (rowData) => {
            return (React.createElement(TaskSumaryComponent, { title: 'Wilhelminastraat', description: '4.1km from your location', totalTime: '23 mins without traffic', isSelected: false }));
        };
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row3', 'row4', 'row5']),
        };
    }
    render() {
        return (React.createElement(ListView, { style: { flex: 1 }, dataSource: this.state.dataSource, renderRow: (rowData) => this.renderRow(rowData) }));
    }
}
//# sourceMappingURL=TaskListComponent.js.map