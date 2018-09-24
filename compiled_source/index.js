import * as React from 'react';
import { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './common/statusbar';
export class App extends Component {
    render() {
        const positionMarker = require('@images/PositionMarker.png');
        return (React.createElement(View, { style: { flex: 1, flexDirection: 'column', backgroundColor: '#243B53' } },
            React.createElement(MyStatusBar, { barStyle: 'light-content' }),
            React.createElement(View, { style: styles.header },
                React.createElement(Text, { style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }, "Dashboard")),
            React.createElement(View, { style: [styles.header, { backgroundColor: '#1C3147' }] },
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(Image, { source: positionMarker }),
                    React.createElement(Text, { style: { color: 'white', fontSize: 17 } }, " Current Position"))),
            React.createElement(View, { style: { flex: 3, backgroundColor: 'skyblue' } }),
            React.createElement(View, { style: { flex: 1, backgroundColor: 'steelblue' } })));
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
});
AppRegistry.registerComponent('PackageDelivery', () => App);
//# sourceMappingURL=index.js.map