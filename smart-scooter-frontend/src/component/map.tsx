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

import { get_scooters } from "../lib/utils";

import { Scooter, Location, scooterStatus } from '../lib/model';

import { useRef, useMemo, useCallback, useState, useEffect } from "react"
import {useAtom } from "jotai";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const debug = true

export default function Map() {
    const [data, _] = useAtom(atom_data);
    const map_api_key = import.meta.env.VITE_GOOGLE_MAP_API === undefined ? "" : import.meta.env.VITE_GOOGLE_MAP_API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: map_api_key
    })
    const [scooters , set_scooters] = useState<Array<Scooter>>([]);
    useEffect(()=>{
        const fetch = async()=>{
            await (async ()=>{
                set_scooters(await get_scooters())
            })
        }
        fetch()
    }) 
    const mapRef = useRef<GoogleMap>();
    const [center, set_center] = useState<LatLngLiteral>({ lat: 25.01754, lng: 121.53970 })
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "b181cac70f27f5e6",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const onLoad = useCallback((map: any) => {(mapRef.current = map)}, []);
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
                    <Marker position={{ lat: data.current_location.latitude, lng: data.current_location.longitude }} icon={user_icon}>                    </Marker>
                    <MapControl position="TOP_CENTER">
                        <button
                            onClick={() => set_center({ lat: data.current_location.latitude, lng: data.current_location.longitude })}
                            style={{ "margin": 10  , opacity:"0.7"}}
                            className=""
                        >
                            Recenter
                        </button>
                    </MapControl>
                    { scooters === undefined? <></>: scooters?.map((element , _index)=>{
                            return (<Marker icon={scooter_icon} position={{lat:element.location.latitude , lng:element.location.longitude}}></Marker>)
                        })}
                </GoogleMap>
            </div >
            </div>
        </>
    ) : <></>
}
