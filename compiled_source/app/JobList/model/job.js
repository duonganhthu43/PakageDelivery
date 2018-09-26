export class Job {
    constructor(name, pickup, delivery, status = 'new') {
        this.name = name;
        this.pickup = pickup;
        this.delivery = delivery;
        this.status = status;
        this.id = `${pickup.generalInfo.placeId}-${delivery.generalInfo.placeId}`;
    }
}
//# sourceMappingURL=job.js.map