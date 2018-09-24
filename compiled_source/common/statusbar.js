import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
export default class MyStatusBar extends React.Component {
    constructor(props) {
        super(props);
    }
    // tslint:disable-next-line:ter-indent
    render() {
        return (React.createElement(View, { style: { height: (Platform.OS === 'ios') ? 20 : 0 } },
            React.createElement(StatusBar, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=statusbar.js.map