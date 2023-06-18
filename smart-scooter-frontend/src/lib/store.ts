import { atomWithProxy } from 'jotai-valtio'
import { proxy , subscribe } from 'valtio/vanilla'
import {User , Location} from "./model"
import { config } from './config';

interface Iproxy{
    current_location:Location;
    current_user:User;
    current_session:string;
}

const init_location = new Location(25.01754 , 121.53970);

export const anonymous_user = new User(-1 , init_location , "" , ""  ,[] , false);

const anonymous_session = ""

export const proxt_data = proxy(JSON.parse(localStorage.getItem(config.local_storage_keyname) as string) as Iproxy || {current_location:init_location , current_user:anonymous_user , current_session:anonymous_session});

subscribe(proxt_data, () =>{
    localStorage.setItem(config.local_storage_keyname, JSON.stringify(proxt_data))
});

// use atom inside component

export const atom_data = atomWithProxy(proxt_data , {sync:true});