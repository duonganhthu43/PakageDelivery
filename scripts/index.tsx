import * as React from 'react'
import { Component } from 'react'
import { AppRegistry, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import MapComponent from './app/Map/ui/mapComponent'
import TaskListComponent from './app/TaskList/TaskListComponent'
import { StoreFactory } from './core'
import { MapStore } from './app/Map/store/mapStore'
import MyStatusBar from './app/common/statusbar'
import { TasksStore } from './app/TaskList/store/tasksStore'
import { JobStore } from './app/JobList/store/jobStore'
import ComponentBase from './app/common/componentBase'
import { SubscriberInfo } from './app/common/dataStructure/subscriberInfo'
import UpdateTaskListAction from './app/JobList/action/updateTaskListAction'

StoreFactory.registerNoDispose(
  JobStore,
  MapStore,
  TasksStore
)
export class App extends ComponentBase<any, any> {
  protected onSubscribe(): SubscriberInfo<any, any>[] {
    return [
      new SubscriberInfo<any, any>(
        StoreFactory.get(JobStore).processingJobs, (prev, processingJob) => {
          new UpdateTaskListAction(processingJob).start()
          return this.state
        }),
      new SubscriberInfo<any, any>(
        StoreFactory.get(MapStore).currentAddress, (prev, address) => {
          return { ...prev, currentAddress: address }
        })
    ]
  }
  render() {
    const positionMarker = require('@images/PositionMarker.png')
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#243B53' }}>
        <MyStatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Dashboard</Text>
        </View>
        <View style={[styles.header, { backgroundColor: '#1C3147' }]} >
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image style={{ marginRight: 10 }} source={positionMarker}></Image>
            <Text style={{ color: 'white', fontSize: 17 }}>{this.state && this.state.currentAddress}</Text>
          </View>
        </View>
        <View style={{ flex: 3, backgroundColor: 'skyblue' }} >
          <MapComponent></MapComponent>
        </View>
        <View style={{ flex: 2, backgroundColor: 'white' }} >
          <ScrollView style={{ flex: 2 }}>
            <TaskListComponent></TaskListComponent>
          </ScrollView>
          <View style={{
            backgroundColor: 'white',
            height: 50,
            borderColor: '#4CD964',
            borderWidth: 1,
            borderRadius: 25,
            margin: 5,
            flexDirection: 'row'
          }}>
            <TouchableOpacity style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 25,
              backgroundColor: '#4CD964'
            }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Assignment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10
            }}>
              <Text style={{ fontSize: 16, color: '#4CD964' }} >JobQueue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
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
})
AppRegistry.registerComponent('PackageDelivery', () => App)
