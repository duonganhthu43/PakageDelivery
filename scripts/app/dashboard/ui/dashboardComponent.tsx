import * as React from 'react'
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import ComponentBase from '../../common/componentBase'
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo'
import { AssigmentComponent } from '../../assigment/ui/assigmentComponent'
import JobQueueComponent from '../../JobList/ui/jobQueueComponent'

interface State {
    isShowAssignment: boolean
}
export class DashBoardComponent extends ComponentBase<any, State> {
    constructor(props) {
        super(props)
        this.state = { isShowAssignment: true }
    }
    protected onSubscribe(): SubscriberInfo<any, any>[] {
        return [
        ]
    }
    render() {
        const notificationIcon = require('@images/Notification.png')

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#243B53' }}>
                <View style={styles.header}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Dashboard</Text>
                    <Image style={{ marginRight: 10, position: 'absolute', right: 0 }} source={notificationIcon}></Image>
                </View>
                {this.state.isShowAssignment ? <AssigmentComponent></AssigmentComponent> : <JobQueueComponent></JobQueueComponent>}
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{
                        height: 50,
                        borderColor: '#4CD964',
                        borderWidth: 1,
                        borderRadius: 25,
                        margin: 5,
                        flexDirection: 'row'
                    }}>
                        {this.createButton('Assignment', this.state.isShowAssignment, () => { this.setState({ isShowAssignment: true }) })}
                        {this.createButton('Job Queue', !this.state.isShowAssignment, () => { this.setState({ isShowAssignment: false }) })}
                    </View>
                </View>
            </View>
        )
    }
    private createButton = (title: string, isActive: boolean, onPress: () => void): JSX.Element => {
        return (<TouchableOpacity
            onPress={onPress}
            style={[
                isActive ? { backgroundColor: '#4CD964' } : { backgroundColor: 'white' },
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 25
                }]}>
            <Text style={[!isActive ? { color: '#4CD964' } : { color: 'white' }, { fontSize: 16 }]}>{title}</Text>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})