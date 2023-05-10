import {User } from "./model"
import fetch from "node-fetch"
import { config } from "./config";

import { current_session } from "./store";

interface Iresponse<T>{
    success:boolean;
    data:T|null|undefined;
}

export const fetch_data = async <T> (url:string , method:string ,  args:object)=>{
    const fetcher = fetch(config.base_url+url, {
        method:method, 
        headers:{"token":current_session.token,...args}
    });
    const response = await fetcher;
    const data = await response.json();
    return data as Iresponse<T>;

}

export const login = async(username:string , password:string) =>{
    const login_response = await fetch_data<string>("/login" , "POST" , {username , password});
    const login_data = await login_response;
    if( login_data.success === true && login_data.data != null){
        current_session.token = login_data.data;
    }
    else{
        throw "login failed";
    }
    return ;
}

export const logout = async()=>{
    return await fetch_data("/logout" , "GET" , {});
}

export const signup = async(username:string , email:string , password:string){
    
}
