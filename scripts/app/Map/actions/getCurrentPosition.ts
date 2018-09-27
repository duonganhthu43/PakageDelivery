import { Action, Store, StoreFactory } from '../../../core/index'
import { MapState } from '../store/MapState'
import { MapStore } from '../store/mapStore'
import RequestHelper from '../../common/utilities/requestHelper'
import { urlsHelper } from '../../common/urlsHelper'
import Position from '../model/postion'
import GenerateJobAction from '../../JobList/action/generateJobAction'

export default class GetCurrentPositon extends Action<MapState> {
    protected getStore(): Store<MapState> {
        return StoreFactory.get(MapStore)
    }

    public async execute(state: MapState): Promise<any> {
        let result = await RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.SearchPlace}`,
            {
                input: 'Bitexco, VietNam',
                inputtype: 'textquery',
                fields: 'formatted_address,geometry,place_id',
                key: urlsHelper.Google.Key
            })

        const latDelta = Number(result.candidates[0].geometry.viewport.northeast.lat) - Number(result.candidates[0].geometry.viewport.southwest.lat)
        const lngDelta = Number(result.candidates[0].geometry.viewport.northeast.lng) - Number(result.candidates[0].geometry.viewport.southwest.lng)
        const position: Position = {
            latitude: result.candidates[0].geometry.location.lat,
            longitude: result.candidates[0].geometry.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
            address: result.candidates[0].formatted_address,
            place_id: result.candidates[0].place_id
        }
        state.updateCurrentPosition(position)
        new GenerateJobAction(position).start()
    }
}
