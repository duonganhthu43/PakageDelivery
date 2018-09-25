import { Component } from 'react';
import React from 'react';
import { Text, Image, View } from 'react-native';
export default class TaskSumaryComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const positionMarker = require('@images/navigationIcon.png');
        return (React.createElement(View, { style: { flexDirection: 'row', backgroundColor: 'white', marginVertical: 5 } },
            React.createElement(View, { style: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                } },
                React.createElement(View, { style: {
                        backgroundColor: '#EEEEEE', justifyContent: 'center',
                        alignItems: 'center', height: 38, width: 38, borderRadius: 19
                    } },
                    React.createElement(Text, { style: { textAlign: 'center', fontWeight: 'bold' } }, "3.4"))),
            React.createElement(View, { style: {
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
                } },
                React.createElement(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                    React.createElement(Text, { style: {
                            fontWeight: 'bold',
                            fontSize: 15
                        } }, this.props.title),
                    React.createElement(View, { style: {
                            borderColor: '#C7C7C2',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center', width: 25, height: 25, borderRadius: 12.5
                        } },
                        React.createElement(Image, { source: positionMarker }))),
                React.createElement(Text, { style: { color: '#9E9E9E', fontSize: 14 } }, this.props.description),
                React.createElement(Text, { style: { color: '#9E9E9E', fontSize: 12 } }, this.props.totalTime))));
    }
}
//# sourceMappingURL=taskSumaryComponent.js.map