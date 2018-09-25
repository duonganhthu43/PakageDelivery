
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'

// interface Region {
//     latitude: number
//     longitude: number
//     latitudeDelta: number
//     longitudeDelta: number
// }

interface State {
    latitude: number
    longitude: number
    error: string
}

export default class MapComponent extends Component<any, State> {
    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        )
    }

    render() {
        return (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                        coordinate={{ 'latitude': this.state.latitude, 'longitude': this.state.longitude }}
                        title={'Current Location'}
                    />}
                </MapView>
            )
    }
}
