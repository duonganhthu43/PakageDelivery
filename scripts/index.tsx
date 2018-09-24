import * as React from 'react'
import { Component } from 'react'
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native'
import MyStatusBar from './common/statusbar'

export interface Props { }
export interface State { }

export class App extends Component<any, State> {
  render() {
    const positionMarker = require('@images/PositionMarker.png')

    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#243B53' }}>
        <MyStatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Dashboard</Text>
        </View>
        <View style={[styles.header, { backgroundColor: '#1C3147' }]} >
          <View style={{flexDirection: 'row'}}>
            <Image source={positionMarker}></Image>
            <Text style={{ color: 'white', fontSize: 17 }}> Current Position</Text>
          </View>
        </View>
        <View style={{ flex: 3, backgroundColor: 'skyblue' }} />
        <View style={{ flex: 1, backgroundColor: 'steelblue' }} />
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
