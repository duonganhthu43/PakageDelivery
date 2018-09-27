import * as React from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { StoreFactory } from '../../../core'
import { MapStore } from '../../Map/store/mapStore'
import ComponentBase from '../../common/componentBase'
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo'
import MapComponent from '../../Map/ui/mapComponent'
import TaskListComponent from '../../TaskList/TaskListComponent'

export class AssigmentComponent extends ComponentBase<any, any> {
    protected onSubscribe(): SubscriberInfo<any, any>[] {
        return [
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
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 40,
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
