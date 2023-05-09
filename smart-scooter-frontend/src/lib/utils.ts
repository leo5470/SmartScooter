import { Session } from "./model"
import fetch from "node-fetch"
import { config } from "./config";

export const fetch_data = async (session:Session , url:string , method:string ,  args:object)=>{
    const fetcher = fetch(config.base_url+url, {
        method:method, 
        headers:{"token":session.token , ...args}
    });
    return await fetcher;
}

