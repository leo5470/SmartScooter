import {
    GoogleMap,
    Marker,
    useJsApiLoader
} from "@react-google-maps/api";

import scooter_icon from "./img/scooter-electric.svg"

import "./map.css"

import { random } from "lodash-es"

import { Scooter, Location, scooterStatus } from '../lib/model';

import { useRef, useMemo, useCallback } from "react"

const generateRandomScooter = () => {
    const location = new Location(25.01754 + random(-0.005, 0.005, true), 121.53970 + random(-0.005, 0.005, true))
    const status = scooterStatus.ready
    return new Scooter(random(1, 100), location, 100, "123-456", status)
}

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const debug = true

export default function Map() {
    const map_api_key = import.meta.env.VITE_GOOGLE_MAP_API === undefined ? "" : import.meta.env.VITE_GOOGLE_MAP_API
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: map_api_key
    })
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({ lat: 25.01754, lng: 121.53970 }),
        []
    );
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "b181cac70f27f5e6",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const scooters: Array<Scooter> = []
    if (debug === true) {
        for (let i = 0; i < 10; i++) {
            scooters.push(generateRandomScooter())
        }
    }
    return isLoaded ? (
        <>
            <div className="map">
                <GoogleMap
                    zoom={15}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    {scooters.map((el, index) => {
                        return (<>
                            <Marker
                                position={{ lat: el.location.latitude, lng: el.location.longitude }}
                                icon={scooter_icon}
                            >
                            </Marker>
                        </>)
                    })}
                </GoogleMap>
            </div >
        </>
    ) : <></>
}
