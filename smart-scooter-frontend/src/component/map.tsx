import GoogleMapReact from 'google-map-react'
export default function Map() {
    const map_api_key = "AIzaSyDP1DwhMbUReJDEI9b0lgIFGKldf0pNM1I";
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    return (
        <>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: map_api_key }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </>
    )

}
