import { Action, Store, StoreFactory } from '../../../core/index'
import { MapState, DirectionCoordinate } from '../store/MapState'
import { MapStore } from '../store/mapStore'
import RequestHelper from '../../common/utilities/requestHelper'
import { urlsHelper } from '../../common/urlsHelper'
import Position from '../model/postion'
import Polyline from '@mapbox/polyline'

export default class GetDirectionAction extends Action<MapState> {
    constructor(readonly origin: Position, readonly destination: Position) { super() }

    protected getStore(): Store<MapState> {
        return StoreFactory.get(MapStore)
    }

    public async execute(state: MapState): Promise<any> {
        if (!this.origin || !this.destination || !this.origin.place_id || !this.destination.place_id) { return }
        let urlDirection = `${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Direction}`
        urlDirection += '?'
        urlDirection += `origin=place_id:${this.origin.place_id}`
        urlDirection += '&'
        urlDirection += `destination=place_id:${this.destination.place_id}`
        urlDirection += '&'
        urlDirection += `key=${urlsHelper.Google.Key}`

        let result = await RequestHelper.get(urlDirection)
        let points = Polyline.decode(result.routes[0].overview_polyline.points)
        let directionPoints: DirectionCoordinate[] = points.map(e => {
            return {
                latitude: e[0],
                longitude: e[1]
            }
        })
        directionPoints.push({ latitude: this.destination.latitude, longitude: this.destination.longitude })
        directionPoints.unshift({ latitude: this.origin.latitude, longitude: this.origin.longitude })
        state.updateDirection(directionPoints)
    }
}
