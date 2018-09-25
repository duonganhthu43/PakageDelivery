import React from 'react'
import { Platform, StatusBar, StatusBarProps, View } from 'react-native'
export default class MyStatusBar extends React.Component<StatusBarProps, any> {
  constructor(props) {
    super(props)
  }
    render() {
      return (
            <View style={{ height: (Platform.OS === 'ios') ? 20 : 0 }}>
                <StatusBar {...this.props} />
            </View>
      )
    }
}
