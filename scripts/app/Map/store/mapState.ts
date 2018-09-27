import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import Position from '../model/postion'

export type DirectionCoordinate = { latitude: number; longitude: number; }

export class MapState extends State {
    private _currentPosition: Position
    private _destinationPosition: Position
    private _direction: DirectionCoordinate[]

    constructor(storeEvent: StoreEvent,
        private readonly _currentPostionSource: BehaviorSubject<Position>,
        private readonly _destinationPostionSource: BehaviorSubject<Position>,
        private readonly _directionSource: BehaviorSubject<DirectionCoordinate[]>
    ) {
        super(storeEvent)
    }

    protected async onLoad(data: any): Promise<void> {
        data = data || []
    }

    protected async onSave(_: Date): Promise<any> {
        return this._currentPosition
    }

    public getCurrentPosition(): Position {
        return this._currentPosition
    }

    public updateCurrentPosition(data: Position) {
        this._currentPostionSource.next(this._currentPosition = data)
    }

    public updateDestinationPosition(data: Position) {
        this._destinationPostionSource.next(this._destinationPosition = data)
    }

    public updateDirection(data: DirectionCoordinate[]) {
        this._directionSource.next(this._direction = data)
    }

}
