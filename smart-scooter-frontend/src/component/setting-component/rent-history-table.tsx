import { useEffect, useState } from "react"
import { Order } from "../../lib/model"
import LocationComponent from "./location-component"
import "./setting-component-css/rent-histroy-table.scoped.css"
import { useAtom } from "jotai"
import { atom_data } from "../../lib/store"
import { get_plate } from "../../lib/utils"

interface Prop {
    order: Order
}

export default function RentHistoryTable({ order }: Prop) {
    const [data , ] = useAtom(atom_data)
    const [plate , set_plate] = useState("")
    useEffect(()=>{
        const loader = async()=>{
            set_plate(await get_plate(order.scooter_id))
        }
        loader()
    },[data.current_order])
    return (
        <article style={{ backgroundColor: "#4F709C" }}>
        <table className="rent-history-table">
            <tbody>
                <tr>
                    <td rowSpan={3}>
                        <div className="car-plate">
                            <span className="vehicle-type">電動車</span>
                            <span className="plate-number">{plate}</span>
                        </div>
                    </td>
                    <td><h2>租車</h2></td>
                    <td><h2>還車</h2></td>
                    <td><h2 style={{ textAlign: "center" }}>費用</h2></td>
                    <td><h2 style={{ textAlign: "center" }}>充電次數</h2></td>
                </tr>
                <tr>
                    <td>
                        <li><h5>時間<br />{order.rent_time}</h5></li>
                        <li><h5>租借地<br /><LocationComponent location={order.history[0]}></LocationComponent></h5></li>
                    </td>
                    <td>
                        <li><h5>時間<br />{order.return_time}</h5></li>
                        <li><h5>還車地<br /><LocationComponent location={order.history[order.history.length - 1]}></LocationComponent></h5></li>
                    </td>
                    <td rowSpan={2}><h2 style={{ textAlign: "center" }}>NT{order.price}</h2><br />
                    {order.use_coupon === true?<span style={{ color: "white", fontWeight: "bold" }}>✅已使用優惠卷</span>:<></>}
                    
                    </td>
                    <td rowSpan={2}><h2 style={{ textAlign: "center" }}>{order.charge_times}次</h2></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <li><h2>總里程 {order.total_distance.toFixed(2)}km</h2></li>
                        <li><h2>租借時長 {order.total_time}sec</h2></li>
                    </td>
                </tr>
            </tbody>
        </table>
</article>
    )
}