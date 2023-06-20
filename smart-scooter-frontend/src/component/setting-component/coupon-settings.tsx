import { useAtom } from "jotai"
import { atom_data } from "../../lib/store"
import { useEffect, useState } from "react"
export default function CouponSettings() {
    const [data, _] = useAtom(atom_data)
    const [coupon_array, set_coupon_array] = useState<Array<null>>(new Array(data.current_user.coupons));
    useEffect(() => {
        const coupons = []
        for (let i=0;i<data.current_user.coupons;i++){
            coupons.push(null)
        }
        set_coupon_array(coupons)
    } , [data.current_user.coupons])
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Your coupons ({data.current_user.coupons})</h1>
                    <h2></h2>
                </hgroup>
                <select>
                    <option value="discount">Sort by Discount</option>
                </select>

                <div className="coupon-list">
                    {coupon_array.map(() => {
                        return (<>
                            <div className="coupon-item">
                                <div className="coupon-details">
                                    <h3>Normal Coupon</h3>
                                    <p>Discount: 10%</p>
                                </div>
                            </div>
                        </>)
                    })}

                </div>
            </article>
        </div>
    )
}

