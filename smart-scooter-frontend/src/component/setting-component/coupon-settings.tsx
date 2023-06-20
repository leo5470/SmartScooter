import { useAtom } from "jotai"
import { atom_data } from "../../lib/store"
import { useEffect, useState } from "react"
import CouponTable from "./coupon-table"
export default function CouponSettings() {
    const [data, _] = useAtom(atom_data)
    const [coupon_array, set_coupon_array] = useState<Array<null>>(new Array(data.current_user.coupons));
    useEffect(() => {
        const coupons = []
        for (let i = 0; i < data.current_user.coupons; i++) {
            coupons.push(null)
        }
        set_coupon_array(coupons)
    }, [data.current_user.coupons])
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Rent History</h1>
                    <h2></h2>
                </hgroup>
                <select>
                    <option value="time" placeholder="Sort by">Sort: 由舊到新</option>
                </select>
                <article style={{ backgroundColor: "#8F9491" }}>
                    <CouponTable/>
                </article>
            </article>
        </div>
    )
}

