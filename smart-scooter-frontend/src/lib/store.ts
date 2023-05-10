import { atomWithProxy } from 'jotai-valtio'
import { proxy } from 'valtio/vanilla'
import {User , Session , Location} from "./model"


const init_location = new Location(25.105497 , 121.597366);

const anonymous_user = new User(-1 , init_location , "" , []);

const anonymous_session = {token:""}

export const current_location = proxy(init_location);

export const current_user = proxy(anonymous_user);

export const current_session = proxy(anonymous_session);

// use atom inside component

export const current_location_atom = atomWithProxy(current_location , {sync:true});

export const current_user_atom = atomWithProxy(current_user,{sync:true});

export const current_session_atom = atomWithProxy(current_session ,{sync:true});