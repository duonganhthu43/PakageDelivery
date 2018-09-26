import { Action, Store, StoreFactory } from '../../../core/index'
import RequestHelper from '../../common/utilities/requestHelper'
import { urlsHelper } from '../../common/urlsHelper'
import Position from '../model/postion'
import { TasksState } from '../../TaskList/store/tasksState'
import { TasksStore } from '../../TaskList/store/tasksStore'

export default class GetNearByLocationAction extends Action<TasksState> {
    constructor(private location: Position) {
        super()
    }
    protected getStore(): Store<TasksState> {
        return StoreFactory.get(TasksStore)
    }

    public async execute(state: TasksState): Promise<any> {
        let data = await RequestHelper.get(`${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.NearbySearch}`,
            {
                location: `${this.location.latitude},${this.location.longitude}`,
                type: 'hospital',
                rankby: 'distance',
                key: urlsHelper.Google.Key
            })
        let arrayTask =
            data.results.map(e => {
                let position: Position = { place_id: e.place_id, latitude: e.geometry.location.lat, longitude: e.geometry.location.lng }
                return position
            }
            )
        let arrayId =
            data.results.map(e => {
                return e.place_id
            }
            )

        let urlDistance = `${urlsHelper.Google.Place.Domain}${urlsHelper.Google.Place.Distance}`
        urlDistance += '?'
        urlDistance += `origins=place_id:${this.location.place_id}`
        urlDistance += '&'
        urlDistance += `destinations=place_id:${arrayId.join('|place_id:')}`
        urlDistance += '&'
        urlDistance += `key=${urlsHelper.Google.Key}`
        console.log('ListDistance ', urlDistance)

        let dataDistance = await RequestHelper.get(urlDistance)
        console.log('ListDistance ', dataDistance)

    }
}
