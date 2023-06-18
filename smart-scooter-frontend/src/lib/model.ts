export enum scooterStatus {
    "ready",
    "repairing",
    "malfunction",
    "rented",
}

class PhysicalObject {
    constructor(public id: number, public location: Location) { }
}

class DigitalObject {
    constructor(public id: number) { }
}

export class Location {
    constructor(public lat: number, public lng: number) { }
}

export class Scooter extends PhysicalObject {
    constructor(scooter_id: number, location: Location, public battery_level: number, public plate_number: string, public status: scooterStatus) {
        super(scooter_id, location);
    }
}

export class User extends PhysicalObject {
    constructor(user_id: number, location: Location, public username: string, public credit_card: string, public coupons: Number, public is_admin: boolean, public telephone_number: string, public email: string) {
        super(user_id, location);
    }
}

export class Station extends PhysicalObject {
    constructor(station_id: number, location: Location, public name: string) {
        super(station_id, location);
    }
}

export class Coupon extends DigitalObject {
    constructor(coupon_id: number, public name: string, public description: string) {
        super(coupon_id);
    }
}

export class Order extends DigitalObject {
    constructor(order_id: number, public user_id: number, public scooter_id: number, public history: Array<Location>, public total_distance: number, public price: number, public active: boolean, public rent_time: string, public return_time: string, public total_time: null | number) {
        super(order_id);
    }
}

export class Session extends DigitalObject {
    constructor(session_id: number, public token: string, public valid_lifetime: Date) {
        super(session_id);
    }
}
