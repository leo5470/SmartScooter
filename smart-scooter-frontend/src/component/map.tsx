import {
    GoogleMap,
    Marker,
    useJsApiLoader
} from "@react-google-maps/api";

import scooter_icon from "./img/vespa-motorcycle-svgrepo-com.svg"

import power_icon from "./img/electric-station-svgrepo-com.svg";

import user_icon from "./img/walk-svgrepo-com.svg";

import { atom_data } from "../lib/store";

import MapControl from "./MapControl";

import "./map.css"

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
    const [scooters, set_scooters] = useState<Array<Scooter>>([]);
    const [stations, set_stations] = useState<Array<Station>>([]);
    useEffect(() => {
        const update_scooters = async () => {
            set_scooters(await get_scooters())
        }
        const update_stations = async ()=>{
            set_stations(await get_stations())
        }
        Promise.all([update_scooters() , update_stations()]).then(()=>console.log(scooters , stations))
    }, [data])
    const mapRef = useRef<GoogleMap>();
    const [center, set_center] = useState<LatLngLiteral>({ lat: 25.01775, lng: 121.53971 })
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "b181cac70f27f5e6",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const onLoad = useCallback((map: any) => { (mapRef.current = map) }, []);
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
                        <Marker position={{ lat: data.current_location.lat, lng: data.current_location.lng }} icon={user_icon}>
                        </Marker>
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
                                    const new_location = new Location(data.current_location.lat , data.current_location.lng-0.0001) 
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
                                    const new_location = new Location(data.current_location.lat , data.current_location.lng+0.0001) 
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
                                    const new_location = new Location(data.current_location.lat+0.0001 , data.current_location.lng) 
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
                                    const new_location = new Location(data.current_location.lat-0.0001 , data.current_location.lng) 
                                    change_user_location(new_location)
                                }}
                                style={{ "margin": 10, opacity: "0.7" }}
                                className="secondary"
                            >
                                DOWN
                            </button>
                        </MapControl>
                        {scooters === undefined ? <></> : scooters?.map((element, _index) => {
                            console.log(element)
                            return (<Marker icon={scooter_icon} position={{ lat: element.location.lat, lng: element.location.lng }}></Marker>)
                        })}
                    </GoogleMap>
                </div >
            </div>
        </>
    ) : <></>
}
