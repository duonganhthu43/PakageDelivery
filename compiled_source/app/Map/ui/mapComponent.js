import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StoreFactory } from '../../../core';
import { MapStore } from '../store/mapStore';
import GetCurrentPositon from '../actions/getCurrentPosition';
import ComponentBase from '../../common/componentBase';
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo';
import { View } from 'react-native';
import { Observable } from 'rxjs';
import GetDirectionAction from '../actions/getDirection';
export default class MapComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.state = {
            currentPosition: undefined,
            destinationPosition: undefined,
            direction: undefined
        };
    }
    componentWillMount() {
        super.componentWillMount();
        this.startAction(new GetCurrentPositon());
    }
    onSubscribe() {
        let source = Observable.combineLatest(StoreFactory.get(MapStore).currentPostion, StoreFactory.get(MapStore).destinationPostion).filter((data) => { return data[0] && data[1] && true; });
        return [
            new SubscriberInfo(StoreFactory.get(MapStore).currentPostion, (prev, position) => {
                return Object.assign({}, prev, { currentPosition: position });
            }),
            new SubscriberInfo(StoreFactory.get(MapStore).destinationPostion, (prev, position) => {
                return Object.assign({}, prev, { destinationPosition: position });
            }),
            new SubscriberInfo(source, (_, data) => {
                new GetDirectionAction(data[0], data[1]).start();
            }),
            new SubscriberInfo(StoreFactory.get(MapStore).direction, (prev, coordinates) => {
                this.mapRef.fitToCoordinates(coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
                    animated: true
                });
                return Object.assign({}, prev, { direction: coordinates });
            })
        ];
    }
    render() {
        const currentPostion = this.state.currentPosition;
        if (!currentPostion) {
            return (React.createElement(View, null));
        }
        const initalRegion = {
            latitude: currentPostion.latitude,
            longitude: currentPostion.latitude,
            latitudeDelta: currentPostion.latitudeDelta,
            longitudeDelta: currentPostion.longitudeDelta
        };
        return (React.createElement(MapView, { style: { flex: 1, borderRadius: 10, backgroundColor: 'white' }, initialRegion: initalRegion, ref: (ref) => { this.mapRef = ref; }, region: {
                latitude: this.state.currentPosition.latitude,
                longitude: this.state.currentPosition.longitude,
                latitudeDelta: this.state.currentPosition.latitudeDelta,
                longitudeDelta: this.state.currentPosition.longitudeDelta
            } },
            this.state.currentPosition.latitude && this.state.currentPosition.longitude && React.createElement(Marker, { pinColor: 'green', coordinate: { 'latitude': this.state.currentPosition.latitude, 'longitude': this.state.currentPosition.longitude }, title: this.state.currentPosition.address }),
            this.state.destinationPosition && this.state.destinationPosition.latitude && this.state.destinationPosition.longitude && React.createElement(Marker, { pinColor: 'red', coordinate: { 'latitude': this.state.destinationPosition.latitude, 'longitude': this.state.destinationPosition.longitude }, title: this.state.destinationPosition.address }),
            this.state.direction && this.state.direction.length > 0 && React.createElement(Polyline, { coordinates: this.state.direction, strokeColor: 'red', strokeWidth: 2 })));
    }
}
//# sourceMappingURL=mapComponent.js.map