import { Component } from 'react'
import React from 'react'
import { Text, Image, View } from 'react-native'
export interface TaskSumaryProperties {
    title: string
    description: string
    totalTime: string
    isSelected: boolean
}
export default class TaskSumaryComponent extends Component<TaskSumaryProperties, any> {

    constructor(props) {
        super(props)
    }
    render() {
        const positionMarker = require('@images/navigationIcon.png')

        return (
            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginVertical: 5 }} >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#EEEEEE', justifyContent: 'center',
                        alignItems: 'center', height: 38, width: 38, borderRadius: 19
                    }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>3.4</Text>
                    </View>
                </View>
                <View style={{
                    flex: 4,
                    height: 85,
                    backgroundColor: '#EEEEEE',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderColor: '#E7E7E7',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 20,
                    marginRight: 10
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>{this.props.title}</Text>
                        <View style={{
                            borderColor: '#C7C7C2',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center', width: 25, height: 25, borderRadius: 12.5
                        }}>
                            <Image source={positionMarker}></Image>
                        </View>
                    </View>
                    <Text style={{ color: '#9E9E9E', fontSize: 14 }}>{this.props.description}</Text>
                    <Text style={{ color: '#9E9E9E', fontSize: 12 }} >{this.props.totalTime}</Text>
                </View>
            </View>)
    }
}