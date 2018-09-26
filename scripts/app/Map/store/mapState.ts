import { State, StoreEvent } from '../../../core'
import { BehaviorSubject } from 'rxjs'
import Position from '../model/postion'

export class MapState extends State {
    private _currentPosition: Position

    constructor(storeEvent: StoreEvent,
        private readonly _currentPostionSource: BehaviorSubject<Position>,
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
}
