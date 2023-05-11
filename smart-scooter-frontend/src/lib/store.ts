import { atomWithProxy } from 'jotai-valtio'
import { proxy } from 'valtio/vanilla'
import {User , Location} from "./model"


const init_location = new Location(25.105497 , 121.597366);

export const anonymous_user = new User(-1 , init_location , "" , ""  ,[] , false);

const anonymous_session = ""

export const proxt_data = proxy({current_location:init_location , current_user:anonymous_user , current_session:anonymous_session});

// use atom inside component

export const atom_data = atomWithProxy(proxt_data , {sync:true});