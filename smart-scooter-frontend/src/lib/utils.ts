import fetch from "node-fetch"
import { config } from "./config";
import { User } from "./model";

import { proxt_data  , anonymous_user} from "./store";

interface Iresponse<T>{
    success:boolean;
    data:T|null|undefined;
}

export const fetch_data = async <T> (url:string , method:string ,  args:object)=>{
    const fetcher = fetch(config.base_url+url, {
        method:method, 
        headers:{"token":proxt_data.current_session,...args}
    });
    const response = await fetcher;
    const data = await response.json();
    return data as Iresponse<T>;

}

export const login = async(username:string , password:string) =>{
    const login_data = await fetch_data<string>("/login" , "POST" , {username , password});
    if( login_data.success === true && login_data.data != null){
        proxt_data.current_session = login_data.data;
    }
    else{
        throw "login failed";
    }
    return await update_user();
}

export const logout = async()=>{
    await fetch_data("/logout" , "GET" , {});
    return await update_user();
}

export const update_user = async()=>{
    const user_data = await fetch_data<User>("/user/get-userinfo" , "POST" ,{});
    if (user_data.success === true && user_data.data != null){
        proxt_data.current_user = {...user_data.data};
    }
    else{
        proxt_data.current_user = {...anonymous_user};
    }
}

export const signup = async(username:string , email:string , password:string)=>{
    const signup_data = await fetch_data<null>("/signup" , "POST" , {username , email , password});
    if (signup_data.success === true){
        login(username , password);
    }
    else{
        throw "signup failed";
    }
}
