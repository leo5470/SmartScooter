import { config } from "./config";
import { User } from "./model";

import { proxt_data, anonymous_user } from "./store";

interface Iresponse<T> {
    success: boolean;
    data: T | null | undefined;
    message: string | null;
    token:string|null;
    userData?:User|null;
}

export const check_api = async () => {
    const ping = await fetch(config.api_url);
    if (ping.status != 200) {
        throw ""
    }
}

export const fetch_data = async <T>(url: string, method: string, args: object) => {
    const fetcher = fetch(config.api_url + url, {
        method: method,
        headers: {"token": proxt_data.current_session, "Content-Type": "application/json" },
        body: Object.keys(args).length === 0 ? undefined : JSON.stringify(args),
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
    try{await fetch_data("/logout", "GET", {});}
    catch(e){}
    proxt_data.current_session = "";
    return await update_user();
}

export const update_user = async () => {
    if (proxt_data.current_session === ""){
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
