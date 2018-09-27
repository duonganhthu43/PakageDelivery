import React from 'react'
import { ListView, View } from 'react-native'
import { Job } from '../model/job'
import { JobStore } from '../store/jobStore'
import { StoreFactory } from '../../../core'
import ComponentBase from '../../common/componentBase'
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo'
import ImmutableSet from '../../common/dataStructure/immutableSet'
import JobSumaryComponent from './jobSumaryComponent'

export default class JobQueueComponent extends ComponentBase<any, any> {
    ds = new ListView.DataSource({ rowHasChanged: (r1: Job, r2: Job) => r1.id !== r2.id })
    constructor(props) {
        super(props)
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
        }
    }

    protected onSubscribe(): SubscriberInfo<ImmutableSet<Job>, any>[] {
        return [
            new SubscriberInfo<ImmutableSet<Job>, any>(
                StoreFactory.get(JobStore).newJobs, (prev, jobs) => {
                    return { ...prev, dataSource: this.ds.cloneWithRows(jobs.toArray()) }
                })
        ]
    }
    render() {
        return (
            this.state.dataSource ?
                <ListView
                    style={{ flex: 1, backgroundColor: 'white' }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                    enableEmptySections={true}
                /> : <View></View>
        )
    }

    renderRow = (rowData: Job, sectionID: string | number, rowID: any) => {
        return (
            <JobSumaryComponent title={rowData.name}
             subTitle1={`${rowData.pickup.name}, ${rowData.pickup.generalInfo.distanceText}`}
             subTitle2={`${rowData.delivery.name}, ${rowData.delivery.generalInfo.distanceText}`}
             ></JobSumaryComponent>
        )
    }
}