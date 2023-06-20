import RentHistoryTable from "./rent-history-table";
import { atom_data } from "../../lib/store";
import { Order } from "../../lib/model";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { get_past_orders } from "../../lib/utils";
export default function RentHistory() {
    const [data,] = useAtom(atom_data)
    const [past_orders, set_past_orders] = useState<Array<Order>>([])
    useEffect(() => {
        const update = async () => {
            set_past_orders(await get_past_orders());
        }
        update()
    }, [data.current_order])
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Rent History</h1>
                    <h2></h2>
                </hgroup>
                <select>
                    <option value="time" placeholder="Sort by">Sort by Date</option>
                </select>
                <article style={{ backgroundColor: "#F7FFE5" }}>
                    {past_orders.map((element, _) => {
                        return(<RentHistoryTable order={element} />)
                    })}

                </article>
            </article>
        </div>
    );
}
