// @ts-nocheck
import { useRef , useEffect } from "react";
import { useGoogleMap } from "@react-google-maps/api";
interface MapControlProps {
    position: keyof typeof google.maps.ControlPosition;
  }
export default function MapControl(props: React.PropsWithChildren<MapControlProps>){
    const map = useGoogleMap();
    const ref = useRef();
    useEffect(() => {
      if (map && ref) {
        map.controls[window.google.maps.ControlPosition[props.position]].push(
          ref.current
        );
      }
    }, [map, ref]);
    return <div ref={ref}>{props.children}</div>;
}