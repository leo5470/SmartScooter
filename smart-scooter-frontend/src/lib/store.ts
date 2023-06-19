import { atomWithProxy } from 'jotai-valtio';
import { proxy, subscribe } from 'valtio/vanilla';
import { User, Location } from "./model";
import { config } from './config';

// 定義 proxy 的介面
interface Iproxy {
    current_location: Location;
    current_user: User;
    current_session: string;
}

// 初始化使用者位置
const init_location = new Location(25.01754, 121.53970);

// 匿名使用者
export const anonymous_user = new User(-1, init_location, "", "", 0, false, "", "");

// 匿名 session
const anonymous_session = "";

// 使用 Valtio 創建 proxy
export const proxt_data = proxy(
    JSON.parse(localStorage.getItem(config.local_storage_keyname) as string) as Iproxy || {
        current_location: init_location,
        current_user: anonymous_user,
        current_session: anonymous_session
    }
);

// 監聽 proxy 變化，並將數據存儲到本地存儲
subscribe(proxt_data, () => {
    localStorage.setItem(config.local_storage_keyname, JSON.stringify(proxt_data));
});

// 在組件中使用 atom
export const atom_data = atomWithProxy(proxt_data, { sync: true });