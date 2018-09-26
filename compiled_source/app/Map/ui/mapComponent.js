import React from 'react';
import MapView from 'react-native-maps';
import { StoreFactory } from '../../../core';
import { MapStore } from '../store/mapStore';
import GetCurrentPositon from '../actions/getCurrentPosition';
import ComponentBase from '../../common/componentBase';
import { SubscriberInfo } from '../../common/dataStructure/subscriberInfo';
export default class MapComponent extends ComponentBase {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0,
                longitudeDelta: 0,
                place_id: 'ddd '
            }
        };
    }
    componentWillMount() {
        super.componentWillMount();
        this.startAction(new GetCurrentPositon());
    }
    onSubscribe() {
        return [
            new SubscriberInfo(StoreFactory.get(MapStore).currentPostion, (prev, position) => {
                console.log('current location 2 ', position);
                return Object.assign({}, prev, { currentPosition: position });
            })
        ];
    }
    render() {
        const currentPostion = this.state.currentPosition;
        const initalRegion = {
            latitude: currentPostion.latitude,
            longitude: currentPostion.latitude,
            latitudeDelta: currentPostion.latitudeDelta,
            longitudeDelta: currentPostion.longitudeDelta
        };
        return (React.createElement(MapView, { style: { flex: 1 }, initialRegion: {
                latitude: currentPostion.latitude,
                longitude: currentPostion.latitude,
                latitudeDelta: currentPostion.latitudeDelta,
                longitudeDelta: currentPostion.longitudeDelta
            }, region: {
                latitude: currentPostion.latitude,
                longitude: currentPostion.latitude,
                latitudeDelta: currentPostion.latitudeDelta,
                longitudeDelta: currentPostion.longitudeDelta
            } }, !!this.state.currentPosition.latitude && !!this.state.currentPosition.longitude && React.createElement(MapView.Marker, { coordinate: { 'latitude': this.state.currentPosition.latitude, 'longitude': this.state.currentPosition.longitude }, title: this.state.currentPosition.address })));
    }
}
//# sourceMappingURL=mapComponent.js.map