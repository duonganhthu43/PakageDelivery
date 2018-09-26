import { Observable } from 'rxjs'

export class SubscriberInfo<DATA, STATE> {
	constructor(public observable: Observable<DATA>, public update?: (prevState: STATE, data: DATA) => STATE | void) { }
}