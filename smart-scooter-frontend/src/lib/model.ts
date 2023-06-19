export enum scooterStatus {
    "ready",         // 可以使用的狀態
    "repairing",     // 維修中的狀態
    "malfunction",   // 故障的狀態
    "rented",        // 租借中的狀態
}

// 物理物件的基礎類別
class PhysicalObject {
    constructor(public id: number, public location: Location) { }
}

// 數位物件的基礎類別
class DigitalObject {
    constructor(public id: number) { }
}

// 位置類別
export class Location {
    constructor(public lat: number, public lng: number) { }
}

// 電動車類別，繼承自物理物件類別
export class Scooter extends PhysicalObject {
    constructor(scooter_id: number, location: Location, public battery_level: number, public plate: string, public status: scooterStatus) {
        super(scooter_id, location);
    }
}

// 使用者類別，繼承自物理物件類別
export class User extends PhysicalObject {
    constructor(user_id: number, location: Location, public username: string, public credit_card: string, public coupons: number, public is_admin: boolean, public telephone_number: string, public email: string) {
        super(user_id, location);
    }
}

// 站點類別，繼承自物理物件類別
export class Station extends PhysicalObject {
    constructor(station_id: number, location: Location, public name: string) {
        super(station_id, location);
    }
}

// 優惠券類別，繼承自數位物件類別
export class Coupon extends DigitalObject {
    constructor(coupon_id: number, public name: string, public description: string) {
        super(coupon_id);
    }
}

// 訂單類別，繼承自數位物件類別
export class Order extends DigitalObject {
    constructor(
        order_id: number,
        public user_id: number,
        public scooter_id: number,
        public history: Array<Location>,
        public total_distance: number,
        public price: number,
        public active: boolean,
        public rent_time: string,
        public return_time: string,
        public total_time: null | number
    ) {
        super(order_id);
    }
}

// 會話類別，繼承自數位物件類別
export class Session extends DigitalObject {
    constructor(session_id: number, public token: string, public valid_lifetime: Date) {
        super(session_id);
    }
}