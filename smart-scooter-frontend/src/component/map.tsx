import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader
} from "@react-google-maps/api";

import scooter_icon from "./img/vespa-motorcycle-svgrepo-com.svg"
import renting_icon from "./img/scooter-vespa-svgrepo-com.svg";
import power_icon from "./img/electric-station-svgrepo-com.svg";
import user_icon from "./img/walk-svgrepo-com.svg";

import { atom_data } from "../lib/store";
import MapControl from "./MapControl";
import "./map.css";
import { change_user_location, get_scooters, get_stations } from "../lib/utils";
import { Scooter, Location, scooterStatus, User, Station } from '../lib/model';
import { useRef, useMemo, useCallback, useState, useEffect } from "react"
import { useAtom } from "jotai";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const debug = true

export default function Map() {
    const [data, set_data] = useAtom(atom_data);
    const map_api_key = import.meta.env.VITE_GOOGLE_MAP_API === undefined ? "" : import.meta.env.VITE_GOOGLE_MAP_API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: map_api_key
    })
    const [scooters, set_scooters] = useState<Array<Scooter>>([]); // 存取機車
    const [stations, set_stations] = useState<Array<Station>>([]); // 存取充電站

    useEffect(() => { // 取得資料庫資料
        const updateScootersAndStations = async () => {
            set_scooters(await get_scooters());
            set_stations(await get_stations());
        };

        updateScootersAndStations();
    }, []);

    const mapRef = useRef<GoogleMap>();
    const [center, set_center] = useState<LatLngLiteral>({ lat: 25.01754, lng: 121.53970 })
    const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null); // 用於標記對話框 InfoWindow
    const [rentedScooter, setRentedScooter] = useState<Scooter | null>(null); // 用於標記被租借機車
    const [isRenting, setIsRenting] = useState(false); // 是否在租車

    const handleRentButtonClick = (scooter: Scooter) => {
        console.log(`Renting scooter with plate: ${scooter.plate}`);
        const nxtIsRenting = !isRenting
        setSelectedScooter(scooter);
        set_scooters(prevScooters => {
            return prevScooters.map(prevScooter => {
                if (prevScooter.id === scooter.id) {
                    return { ...prevScooter, isRenting: nxtIsRenting };
                }
                return { ...prevScooter, isRenting: false };
            });
        });
        setIsRenting(nxtIsRenting); // Toggle the value of isRenting
    };
    



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
                    >   {/* 使用 MapControl 元件來創建地圖控制按鈕 */}
                        <Marker position={{ lat: data.current_location.lat, lng: data.current_location.lng }} icon={user_icon} />
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
                                    const new_location = new Location(data.current_location.lat, data.current_location.lng - 0.01)
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
                                    const new_location = new Location(data.current_location.lat, data.current_location.lng + 0.01)
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
                                    const new_location = new Location(data.current_location.lat + 0.01, data.current_location.lng)
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
                                    const new_location = new Location(data.current_location.lat - 0.01, data.current_location.lng)
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
                                icon={power_icon} />)
                        })}
                        {/* 顯示 Scooter */}
                        {scooters.map((scooter) => {
                            return (
                                <Marker
                                    key={scooter.id}
                                    position={{ lat: scooter.location.lat, lng: scooter.location.lng }}
                                    icon={scooter.isRenting ? renting_icon : scooter_icon}
                                    onMouseDown={() => setSelectedScooter(scooter)}
                                />

                            );
                        })}

                        {/* 顯示選中機車的 InfoWindow */}
                        {selectedScooter && (
                            <InfoWindow
                                position={{ lat: selectedScooter.location.lat + 0.0001, lng: selectedScooter.location.lng }}
                                onCloseClick={() => setSelectedScooter(null)}
                            >
                                <div>
                                    <h3>{selectedScooter.plate}</h3>
                                    <p>Battery Level: {selectedScooter.battery_level}%</p>
                                    <p>Status: {isRenting ? "Renting..." : selectedScooter.status}</p> {/* Update the status based on the isRenting value */}
                                    <button
                                        onClick={() => handleRentButtonClick(selectedScooter)}
                                        className="rent-button"
                                    >
                                        {isRenting ? "還車" : "租車"}
                                    </button>
                                </div>
                            </InfoWindow>
                        )}


                    </GoogleMap>
                </div >
            </div>
        </>
    ) : <></>
}
