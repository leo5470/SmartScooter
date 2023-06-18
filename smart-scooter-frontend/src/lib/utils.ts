import { config } from "./config";
import { Scooter, User , Location, Station, Order } from "./model";

import { proxt_data, anonymous_user } from "./store";

interface Iresponse<T> {
    success: boolean;
    data: T | null | undefined;
    message: string | null;
    token: string | null;
    userData?: User | null;
    battery_level?:number|null|undefined;
}

export const check_api = async () => {
    const ping = await fetch(config.api_url);
    if (ping.status != 200) {
        throw ""
    }
}

export const fetch_data = async <T>(url: string, method: string, body_args: object = {}, request_params: { [key: string]: number | string, } = {}) => {
    const request_url = new URL(config.api_url + url);
    if (Object.keys(request_params).length !== 0) {
        Object.keys(request_params).forEach((key) => {
            const val = request_params[key]
            if (val !== undefined) {
                request_url.searchParams.append(key, val.toString());
            }
        })
    }
    const fetcher = fetch(request_url, {
        method: method,
        headers: { "token": proxt_data.current_session, "Content-Type": "application/json" },
        body: Object.keys(body_args).length === 0 ? undefined : JSON.stringify(body_args),
    });
    const response = await fetcher;
    const data = await response.json() as Iresponse<T>;
    if (data.success === false) {
        throw data.message;
    }
    return data

}

export const login = async (username: string, password: string) => {
    const login_data = await fetch_data<string>("/login", "POST", { username, password });
    if (login_data.success === true && login_data.token != undefined) {
        proxt_data.current_session = login_data.token;
    }
    return await update_user();
}

export const logout = async () => {
    try { await fetch_data("/logout", "GET", {}); }
    catch (e) { }
    proxt_data.current_session = "";
    return await update_user();
}

export const change_user_location = async (location: Location) => {
    const new_location = new Location(location.lat , location.lng);
    const new_user = new User(proxt_data.current_user.id, new_location, proxt_data.current_user.username, proxt_data.current_user.credit_card, proxt_data.current_user.coupons, proxt_data.current_user.is_admin , proxt_data.current_user.telephone_number , proxt_data.current_user.email)
    proxt_data.current_location = new_location
    proxt_data.current_user = new_user
    return await sync_user();
}
export const sync_user = async()=>{
    await fetch_data<null>("/update-userinfo ", "POST" , {...proxt_data.current_user})
    await update_user()
}

export const update_user = async () => {
    if (proxt_data.current_session === "") {
        proxt_data.current_user = { ...anonymous_user };
        return;
    }
    const user_data = await fetch_data<User>("/get-userinfo", "GET", {});
    if (user_data.success === true && user_data.userData != null) {
        proxt_data.current_user = { ...user_data.userData };
    }
    else {
        proxt_data.current_user = { ...anonymous_user };
    }
}

export const signup = async (username: string, email: string, password: string) => {
    const signup_data = await fetch_data<null>("/signup", "POST", { username, email, password });
    if (signup_data.success === true) {
        login(username, password);
    }
}

export const get_order = async()=>{
    const order_data = await fetch_data<Order>("/user/active-order" , "GET");
    if (order_data.success === true && order_data.data != null){
        console.log(order_data.data)
        return order_data.data
    }
    else{
        return null
    }
}

export const rent_scooter = async(scooter_id:number)=>{
    await fetch_data<null>("/user/rent" , "POST" , {"scooter_id":scooter_id} , {})
    return await get_order()
}

export const return_scooter = async()=>{
    await fetch_data<null>("/user/return" , "POST" , {"use_coupon":false});
    return await get_order()
}
export const get_scooters = async (range: number = 100) => {
    const scooters_data = await fetch_data<Array<Scooter>>("/user/search/scooter", "GET", {}, { "range": range });
    if (scooters_data.success === true && scooters_data.data != null && scooters_data.data != undefined) {
        console.log(scooters_data.data)
        return scooters_data.data;
    }
    else {
        return [];
    }
}

export const get_stations = async (range: number = 500) => {
    const stations_data = await fetch_data<Array<Station>>("/user/search/station", "GET", {}, { "range": range });
    if (stations_data.success === true && stations_data.data != null && stations_data.data != undefined) {
        console.log(stations_data.data)
        return stations_data.data;
    }
    else {
        return [];
    }
}

export const recharge_scooter = async(station_id:number)=>{
    await fetch_data<null>("/user/recharge" , "POST" , {"station_id":station_id} , {})
    return await get_order()
}

export const get_battery_level = async()=>{
    const battery_data = await fetch_data<null>("/user/get-battery" , "GET");
    if (battery_data.battery_level !== undefined && battery_data.success === true){
        return battery_data.battery_level;
    }
    else{
        return 100;
    }
}