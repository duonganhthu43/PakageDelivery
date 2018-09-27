import * as React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import ComponentBase from '../../common/componentBase';
import { AssigmentComponent } from '../../assigment/ui/assigmentComponent';
import JobQueueComponent from '../../JobList/ui/jobQueueComponent';
export class DashBoardComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.createButton = (title, isActive, onPress) => {
            return (React.createElement(TouchableOpacity, { onPress: onPress, style: [
                    isActive ? { backgroundColor: '#4CD964' } : { backgroundColor: 'white' },
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        borderRadius: 25
                    }
                ] },
                React.createElement(Text, { style: [!isActive ? { color: '#4CD964' } : { color: 'white' }, { fontSize: 16 }] }, title)));
        };
        this.state = { isShowAssignment: true };
    }
    onSubscribe() {
        return [];
    }
    render() {
        const notificationIcon = require('@images/Notification.png');
        return (React.createElement(View, { style: { flex: 1, flexDirection: 'column', backgroundColor: '#243B53' } },
            React.createElement(View, { style: styles.header },
                React.createElement(Text, { style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }, "Dashboard"),
                React.createElement(Image, { style: { marginRight: 10, position: 'absolute', right: 0 }, source: notificationIcon })),
            this.state.isShowAssignment ? React.createElement(AssigmentComponent, null) : React.createElement(JobQueueComponent, null),
            React.createElement(View, { style: { backgroundColor: 'white' } },
                React.createElement(View, { style: {
                        height: 50,
                        borderColor: '#4CD964',
                        borderWidth: 1,
                        borderRadius: 25,
                        margin: 5,
                        flexDirection: 'row'
                    } },
                    this.createButton('Assignment', this.state.isShowAssignment, () => { this.setState({ isShowAssignment: true }); }),
                    this.createButton('Job Queue', !this.state.isShowAssignment, () => { this.setState({ isShowAssignment: false }); })))));
    }
}
const styles = StyleSheet.create({
    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
//# sourceMappingURL=dashboardComponent.js.map