import { Action, Store, StoreFactory } from '../../../core/index'
import RequestHelper from '../../common/utilities/requestHelper'
import { urlsHelper } from '../../common/urlsHelper'
import Position from '../model/postion'
import { TasksState } from '../../TaskList/store/tasksState'
import { TasksStore } from '../../TaskList/store/tasksStore'
import { Task, TaskDetail } from '../../TaskList/model/task'

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
                type: 'museum',
                rankby: 'distance',
                key: urlsHelper.Google.Key
            })
        let arrayPosition =
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

        let dataDistanceResult = await RequestHelper.get(urlDistance)
        let destinationAddress = dataDistanceResult.destination_addresses
        let destinationInfo = dataDistanceResult.rows[0].elements
        let destinationName = data.results.map(e => {
            return e.name
        })
        let combinedData = this.zip([arrayId, destinationAddress, destinationName, destinationInfo, arrayPosition])

        let combinedData2: TaskDetail[] = combinedData.map(e => {
            const task: Task = {
                title: e[2],
                distanceText: e[3].distance.text + ' from your location',
                durationText: e[3].duration.text + ' without traffic',
                placeId: e[0]
            }
            return {
                generalInfo: task,
                position: { ...e[4], name: e[2], address: e[1] },
                address: e[1],
                name: e[2],
                distanceValue: (Math.round((e[3].distance.value / 1000) * 10)) / 10
            }
        })
        return combinedData2

    }
    private zip(arrays) {
        return arrays[0].map(function (_, i) {
            return arrays.map(function (array) { return array[i] })
        })
    }
}
