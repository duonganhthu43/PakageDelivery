import { Component } from 'react'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
export interface JobSumaryProperties {
    title: string
    subTitle1: string
    subTitle2: string
}

export default class JobSumaryComponent extends Component<JobSumaryProperties, any> {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.subtitle}><Text style={{ color: '#4CD964', fontWeight: 'bold' }}>PICK UP:</Text> {this.props.subTitle1}</Text>
                <Text style={styles.subtitle}><Text style={{ color: '#FF9500', fontWeight: 'bold' }}>DELIVERY:</Text> {this.props.subTitle2}</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        backgroundColor: '#EEEEEE',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 20,
        borderColor: '#E7E7E7',
        marginHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    subtitle: {
        color: '#9E9E9E',
        fontSize: 14
    }
})
