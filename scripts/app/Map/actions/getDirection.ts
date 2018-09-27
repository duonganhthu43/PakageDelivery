import { Action, Store, StoreFactory } from '../../../core/index'
import { MapState } from '../store/MapState'
import { MapStore } from '../store/mapStore'
import RequestHelper from '../../common/utilities/requestHelper'
import { urlsHelper } from '../../common/urlsHelper'
import Position from '../model/postion'
import { Polyline } from 'react-native-maps';

export default class GetDirectionAction extends Action<MapState> {
    constructor(readonly origin: Position, readonly destination: Position) { super() }

    protected getStore(): Store<MapState> {
        return StoreFactory.get(MapStore)
    }

    public async execute(state: MapState): Promise<any> {
        let result = await RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Direction}`,
            {
                origin: `place_id:${this.origin.place_id}`,
                destination: `place_id:${this.destination.place_id}`,
                key: urlsHelper.Google.Key
            })
            console.log('GetDirectionAction ', result)
            let points = Polyline.decode()
        
        //state.updateCurrentPosition(position)
        //new GenerateJobAction(position).start()
    }
}
