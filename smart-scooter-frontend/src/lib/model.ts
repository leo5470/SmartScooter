enum scooterStatus{
    "ready",
    "repairing",
    "malfunction",
    "rented",
}

class PhysicalObject{
    constructor(public id:number , public location:Location){}
}

class DigitalObject{
    constructor(public id:number){}
}

export class Location{
    constructor(public latitude:number ,public longitude:number){}
}

export class Scooter extends PhysicalObject{
    constructor(scooter_id:number , location:Location ,  public battery_level:number , public plate_number:string , public status:scooterStatus){
        super(scooter_id , location);
    }
}

export class User extends PhysicalObject{
    constructor(user_id:number , location:Location  , public credit_card:string , public coupons:Array<Coupon>){
        super(user_id , location);
    }
}

export class Station extends PhysicalObject{
    constructor(station_id:number , location:Location , public name:string){
        super(station_id , location);
    }
}

export class Coupon extends DigitalObject{
    constructor(coupon_id:number , public name:string , public description:string){
        super(coupon_id);
    }
}

export class Session extends DigitalObject{
    constructor(session_id:number , public token:string , public valid_lifetime:Date){
        super(session_id);
    }
}
