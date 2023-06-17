import { config } from "./config";
import { Scooter, User , Location, Station } from "./model";

import { proxt_data, anonymous_user } from "./store";

interface Iresponse<T> {
    success: boolean;
    data: T | null | undefined;
    message: string | null;
    token: string | null;
    userData?: User | null;
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
    const new_user = new User(proxt_data.current_user.id, new_location, proxt_data.current_user.username, proxt_data.current_user.credit_card, Array.from(proxt_data.current_user.coupons), proxt_data.current_user.is_admin)
    proxt_data.current_location = new_location
    proxt_data.current_user = new_user
    return await update_user();
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

export const get_scooters = async (range: number = 150) => {
    const scooters_data = await fetch_data<Array<Scooter>>("/user/search/scooter", "GET", {}, { "range": range });
    if (scooters_data.success === true && scooters_data.data != null && scooters_data.data != undefined) {
        return scooters_data.data;
    }
    else {
        return [];
    }
}

export const get_stations = async (range: number = 150) => {
    const stations_data = await fetch_data<Array<Station>>("/user/search/station", "GET", {}, { "range": range });
    if (stations_data.success === true && stations_data.data != null && stations_data.data != undefined) {
        return stations_data.data;
    }
    else {
        return [];
    }
}
