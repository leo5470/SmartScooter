import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader
} from "@react-google-maps/api";

import scooter_icon from "./img/vespa-motorcycle-svgrepo-com.svg"
import renting_icon from "./img/vespa-motorcycle-svgrepo-com-renting.svg";
import power_icon from "./img/electric-station-svgrepo-com.svg";
import user_icon from "./img/walk-svgrepo-com.svg";

import { atom_data } from "../lib/store";
import MapControl from "./MapControl";
import "./map.css";
import { change_user_location, get_battery_level, get_order, get_scooters, get_stations, recharge_scooter, rent_scooter, return_scooter } from "../lib/utils";
import { Scooter, Location, Station, Order } from '../lib/model';
import { useRef, useMemo, useCallback, useState, useEffect } from "react"
import { useAtom } from "jotai";
import { ToastContainer, toast } from 'react-toastify';

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function Map() {
    const [data, _] = useAtom(atom_data);
    const map_api_key = import.meta.env.VITE_GOOGLE_MAP_API === undefined ? "" : import.meta.env.VITE_GOOGLE_MAP_API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: map_api_key
    })
    const [scooters, set_scooters] = useState<Array<Scooter>>([]); // 存取機車
    const [stations, set_stations] = useState<Array<Station>>([]); // 存取充電站
    const [current_order, set_current_order] = useState<Order | null>(null);
    const [current_battery_level, set_battery_level] = useState(100);
    const [use_coupon, set_use_coupon] = useState(false);


    useEffect(() => { // 取得資料庫資料
        const updateScootersAndStations = async () => {
            set_scooters(await get_scooters());
            set_stations(await get_stations());
        };
        const getOrderData = async () => {
            try {
                set_current_order(await get_order());
            } catch (e) {
                console.log(e)
                set_current_order(null)
            }
            try {
                set_battery_level(await get_battery_level());
            } catch (e) {
                console.log(e)
                set_battery_level(100);
            }
        }
        Promise.all([updateScootersAndStations(), getOrderData()]);
    }, [data]);

    const mapRef = useRef<GoogleMap>();
    const [center, set_center] = useState<LatLngLiteral>({ lat: 25.01754, lng: 121.53970 })
    const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null); // 用於標記對話框 InfoWindow
    const [selectedStation, setSelectedStation] = useState<Station | null>(null); // 用於標記對話框 InfoWindow
    const [show_return_window, set_show_return_window] = useState(false)
    // 建立地圖選項
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "b181cac70f27f5e6",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    // 載入地圖時的回調函式
    const onLoad = useCallback((map: any) => { (mapRef.current = map) }, []);
    // 如果 Google 地圖 API 已載入，則顯示地圖
    return isLoaded ? (
        <>
            <div className="map-container">
                <div className="map" >
                    <GoogleMap
                        zoom={15}
                        center={center}
                        mapContainerClassName="map-container"
                        options={options}
                        onLoad={onLoad}
                    >   
                        <Marker position={{ lat: data.current_location.lat, lng: data.current_location.lng }} icon={current_order === null ? user_icon : renting_icon} onMouseDown={() => set_show_return_window(true)} />
                        {(current_order !== null && show_return_window === true) ?
                            <InfoWindow
                                position={{ lat: data.current_location.lat, lng: data.current_location.lng }}
                                onCloseClick={() => set_show_return_window(false)}
                            >
                                <div>
                                    <h3>Return Scooter</h3>
                                    {data.current_user.coupons > 0 ? <p>

                                        <input type="checkbox" checked={use_coupon} onClick={() => set_use_coupon(!use_coupon)} />
                                        Use coupon
                                    </p> : <></>}
                                    <button onClick={() => { return_scooter(); toast("Wow so easy!"); setTimeout(() => location.reload(), 500) }}
                                    >
                                        Return
                                    </button>
                                </div>
                            </InfoWindow> : <></>}
                        {current_order === null ? <></> : <MapControl position="BOTTOM_LEFT">
                            <button
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="contrast"
                            >
                                Battery Level:{current_battery_level}%
                            </button>
                        </MapControl>}
                        <MapControl position="TOP_LEFT">
                            <button
                                onClick={() => set_center({ lat: data.current_location.lat, lng: data.current_location.lng })}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className=""
                            >
                                Recenter
                            </button>
                        </MapControl>
                        <MapControl position="LEFT_CENTER">
                            <button
                                onClick={() => {
                                    const new_location = new Location(data.current_location.lat, data.current_location.lng - 0.001)
                                    change_user_location(new_location)
                                }}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="secondary"
                            >
                                LEFT
                            </button>
                        </MapControl>
                        <MapControl position="RIGHT_CENTER">
                            <button
                                onClick={() => {
                                    const new_location = new Location(data.current_location.lat, data.current_location.lng + 0.001)
                                    change_user_location(new_location)
                                }}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="secondary"
                            >
                                RIGHT
                            </button>
                        </MapControl>
                        <MapControl position="TOP_CENTER">
                            <button
                                onClick={() => {
                                    const new_location = new Location(data.current_location.lat + 0.001, data.current_location.lng)
                                    change_user_location(new_location)
                                }}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="secondary"
                            >
                                UP
                            </button>
                        </MapControl>
                        <MapControl position="BOTTOM_CENTER">
                            <button
                                onClick={() => {
                                    const new_location = new Location(data.current_location.lat - 0.001, data.current_location.lng)
                                    change_user_location(new_location)
                                }}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="secondary"
                            >
                                DOWN
                            </button>
                        </MapControl>
                        {/* 顯示 Station */}
                        {stations.map((station) => {
                            return (<Marker
                                key={station.id}
                                position={{ lat: station.location.lat, lng: station.location.lng }}
                                icon={power_icon}
                                onMouseDown={() => setSelectedStation(station)}
                            />)

                        })}
                        {/* 顯示 Scooter */}
                        {current_order === null ? scooters.map((scooter) => {
                            return (
                                <Marker
                                    key={scooter.id}
                                    position={{ lat: scooter.location.lat, lng: scooter.location.lng }}
                                    icon={scooter_icon}
                                    onMouseDown={() => setSelectedScooter(scooter)}
                                />

                            );
                        }) : <></>}

                        {current_order !== null ? (selectedStation && (
                            <InfoWindow
                                position={{ lat: selectedStation.location.lat + 0.0001, lng: selectedStation.location.lng }}
                                onCloseClick={() => setSelectedStation(null)}
                            >
                                <div>
                                    <h3>Recharge Station</h3>
                                    <button onClick={async () => { await recharge_scooter(selectedStation.id); await set_battery_level(await get_battery_level()); }}
                                    >
                                        Recharge
                                    </button>
                                </div>
                            </InfoWindow>
                        )) : <></>}


                        {/* 顯示選中機車的 InfoWindow */}
                        {current_order === null ? (selectedScooter && (
                            <InfoWindow
                                position={{ lat: selectedScooter.location.lat + 0.0001, lng: selectedScooter.location.lng }}
                                onCloseClick={() => setSelectedScooter(null)}
                            >
                                <div>
                                    <h3>{selectedScooter.plate}</h3>
                                    <p>Battery Level: {selectedScooter.battery_level}%</p>
                                    <p>Status: {selectedScooter.status}</p> {/* Update the status based on the isRenting value */}
                                    <button
                                        onClick={() => { rent_scooter(selectedScooter.id); location.reload() }}
                                        className="rent-button"
                                    >
                                        Rent
                                    </button>
                                </div>
                            </InfoWindow>
                        )) : <></>}


                    </GoogleMap>
                </div >
                <ToastContainer />
            </div>
        </>
    ) : <></>
}
