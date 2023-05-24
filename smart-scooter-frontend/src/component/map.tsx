import GoogleMapReact from 'google-map-react'
export default function Map() {
    const map_api_key = "AIzaSyDP1DwhMbUReJDEI9b0lgIFGKldf0pNM1I";
    const defaultProps = {
        center: {
            lat: 25.01754,
            lng: 121.53970
        },
        zoom: 16
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
