import React from 'react';
import { ListView, View } from 'react-native';
import { JobStore } from '../store/jobStore';
import { StoreFactory } from '../../../core';
import ComponentBase from '../../common/componentBase';
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo';
import JobSumaryComponent from './jobSumaryComponent';
export default class JobQueueComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
        this.renderRow = (rowData, sectionID, rowID) => {
            return (React.createElement(JobSumaryComponent, { title: rowData.name, subTitle1: `${rowData.pickup.name}, ${rowData.pickup.generalInfo.distanceText}`, subTitle2: `${rowData.delivery.name}, ${rowData.delivery.generalInfo.distanceText}` }));
        };
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
        };
    }
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(JobStore).newJobs, (prev, jobs) => {
                return Object.assign({}, prev, { dataSource: this.ds.cloneWithRows(jobs.toArray()) });
            })
        ];
    }
    render() {
        return (this.state.dataSource ?
            React.createElement(ListView, { style: { flex: 1, backgroundColor: 'white' }, dataSource: this.state.dataSource, renderRow: (rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID), enableEmptySections: true }) : React.createElement(View, null));
    }
}
//# sourceMappingURL=jobQueueComponent.js.map