import React from 'react';
import MapView, { Marker } from 'react-native-maps';
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
        this.state = {
            currentPosition: undefined,
            destinationPosition: undefined
        };
    }
    componentWillMount() {
        super.componentWillMount();
        this.startAction(new GetCurrentPositon());
    }
    onSubscribe() {
        let source = Observable.combineLatest(StoreFactory.get(MapStore).currentPostion, StoreFactory.get(MapStore).destinationPostion);
        return [
            new SubscriberInfo(StoreFactory.get(MapStore).currentPostion, (prev, position) => {
                return Object.assign({}, prev, { currentPosition: position });
            }),
            new SubscriberInfo(StoreFactory.get(MapStore).destinationPostion, (prev, position) => {
                return Object.assign({}, prev, { destinationPosition: position });
            }),
            new SubscriberInfo(source, (prev, data) => {
                new GetDirectionAction(data[0], data[1]).start();
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
        return (React.createElement(MapView, { style: { flex: 1, borderRadius: 10, backgroundColor: 'white' }, initialRegion: initalRegion, region: { latitude: this.state.currentPosition.latitude, longitude: this.state.currentPosition.longitude, latitudeDelta: this.state.currentPosition.latitudeDelta, longitudeDelta: this.state.currentPosition.longitudeDelta } }, !!this.state.currentPosition.latitude && !!this.state.currentPosition.longitude && React.createElement(Marker, { coordinate: { 'latitude': this.state.currentPosition.latitude, 'longitude': this.state.currentPosition.longitude }, title: this.state.currentPosition.address })));
    }
}
//# sourceMappingURL=mapComponent.js.map