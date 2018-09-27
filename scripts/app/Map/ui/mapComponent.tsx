
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StoreFactory } from '../../../core'
import { MapStore } from '../store/mapStore'
import Position from '../model/postion'
import GetCurrentPositon from '../actions/getCurrentPosition'
import ComponentBase from '../../common/componentBase'
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo'
import { View } from 'react-native'
import Polyline from '@mapbox/polyline'
import { Observable } from 'rxjs';
import GetDirectionAction from '../actions/getDirection';
interface State {
    currentPosition?: Position
    destinationPosition?: Position
}

export default class MapComponent extends ComponentBase<any, State> {

    constructor(props) {
        super(props)
        this.state = {
            currentPosition: undefined,
            destinationPosition: undefined
        }
    }

    componentWillMount() {
        super.componentWillMount()
        this.startAction(new GetCurrentPositon())
    }

    protected onSubscribe(): SubscriberInfo<any, State>[] {
        let source = Observable.combineLatest(StoreFactory.get(MapStore).currentPostion, StoreFactory.get(MapStore).destinationPostion)

        return [
            new SubscriberInfo<Position, State>(
                StoreFactory.get(MapStore).currentPostion, (prev, position) => {
                    return { ...prev, currentPosition: position }
                }),
            new SubscriberInfo<Position, State>(
                StoreFactory.get(MapStore).destinationPostion, (prev, position) => {
                    return { ...prev, destinationPosition: position }
                }),
            new SubscriberInfo<[Position, Position], State>(source, (prev, data) => {
                new GetDirectionAction(data[0], data[1]).start()
            })
        ]
    }

    render() {
        const currentPostion = this.state.currentPosition
        if (!currentPostion) { return (<View></View>) }
        const initalRegion = {
            latitude: currentPostion.latitude,
            longitude: currentPostion.latitude,
            latitudeDelta: currentPostion.latitudeDelta,
            longitudeDelta: currentPostion.longitudeDelta
        }

        return (
            <MapView
                style={{ flex: 1, borderRadius: 10, backgroundColor: 'white' }}
                initialRegion={initalRegion}
                region={{ latitude: this.state.currentPosition.latitude, longitude: this.state.currentPosition.longitude, latitudeDelta: this.state.currentPosition.latitudeDelta, longitudeDelta: this.state.currentPosition.longitudeDelta }}
            >
                {!!this.state.currentPosition.latitude && !!this.state.currentPosition.longitude && <Marker
                    coordinate={{ 'latitude': this.state.currentPosition.latitude, 'longitude': this.state.currentPosition.longitude }}
                    title={this.state.currentPosition.address}
                />}
            </MapView>
        )
    }
}
