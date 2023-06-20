import { Location } from "../../lib/model"
interface Props{
    location:Location
}
export default function LocationComponent({location}:Props){
    return (<>
        <p>
            lat:{location.lat.toFixed(3)} lng:{location.lng.toFixed(3)}
        </p>
    </>)
}