import Postion from '../../Map/model/postion'

export interface Task {
    title: string
    distanceText: string
    durationText: string
    placeId: string
}

export interface TaskDetail {
    generalInfo: Task
    position: Postion
    address: string
    name: string
    distanceValue: number
    type: string
}