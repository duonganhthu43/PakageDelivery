import { Component } from 'react';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class JobSumaryComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.title }, this.props.title),
            React.createElement(Text, { style: styles.subtitle },
                React.createElement(Text, { style: { color: '#4CD964', fontWeight: 'bold' } }, "PICK UP:"),
                " ",
                this.props.subTitle1),
            React.createElement(Text, { style: styles.subtitle },
                React.createElement(Text, { style: { color: '#FF9500', fontWeight: 'bold' } }, "DELIVERY:"),
                " ",
                this.props.subTitle2)));
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
});
//# sourceMappingURL=jobSumaryComponent.js.map