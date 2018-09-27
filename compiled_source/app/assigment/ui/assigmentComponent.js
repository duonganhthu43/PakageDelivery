import * as React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StoreFactory } from '../../../core';
import { MapStore } from '../../Map/store/mapStore';
import ComponentBase from '../../common/componentBase';
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo';
import MapComponent from '../../Map/ui/mapComponent';
import TaskListComponent from '../../TaskList/TaskListComponent';
export class AssigmentComponent extends ComponentBase {
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(MapStore).currentAddress, (prev, address) => {
                return Object.assign({}, prev, { currentAddress: address });
            })
        ];
    }
    render() {
        const positionMarker = require('@images/PositionMarker.png');
        return (React.createElement(View, { style: { flex: 1, flexDirection: 'column', backgroundColor: '#243B53' } },
            React.createElement(View, { style: [styles.header, { backgroundColor: '#1C3147' }] },
                React.createElement(View, { style: {
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    } },
                    React.createElement(Image, { style: { marginRight: 10 }, source: positionMarker }),
                    React.createElement(Text, { style: { color: 'white', fontSize: 17 } }, this.state && this.state.currentAddress))),
            React.createElement(View, { style: { flex: 3, backgroundColor: 'skyblue' } },
                React.createElement(MapComponent, null)),
            React.createElement(View, { style: { flex: 2, backgroundColor: 'white' } },
                React.createElement(ScrollView, { style: { flex: 2 } },
                    React.createElement(TaskListComponent, null)))));
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
});
//# sourceMappingURL=assigmentComponent.js.map