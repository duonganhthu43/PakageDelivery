import { Component } from 'react'
import React from 'react'
import { Text, Image, View } from 'react-native'
export interface TaskSumaryProperties {
    title: string
    description: string
    totalTime: string
    isSelected: boolean
    distance: number
    type: string
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 12 }}>{this.props.distance}</Text>
                    </View>
                </View>
                <View style={[this.props.isSelected ? { borderColor: '#FF9500' } : { borderColor: '#E7E7E7' }, {
                    flex: 4,
                    height: 85,
                    backgroundColor: '#EEEEEE',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 20,
                    marginRight: 10
                }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>{this.props.title}</Text>
                        <View style={[{
                            borderColor: '#C7C7C2',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center', width: 25, height: 25, borderRadius: 12.5
                        }, !this.props.isSelected ? { display: 'none' } : null]}>
                            <Image source={positionMarker}></Image>
                        </View>
                    </View>
                    <Text style={{ color: '#9E9E9E', fontSize: 14 }}>{this.props.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#9E9E9E', fontSize: 12 }} >{this.props.totalTime}</Text>
                        <Text style={[this.props.type.toUpperCase() === 'PICKUP' ? { color: '#4CD964' } : { color: '#FF9500' }, { fontSize: 12 }]} >{this.props.type.toUpperCase()}</Text>

                    </View>
                </View>
            </View>)
    }
}