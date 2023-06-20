import AddNewCard from "./add-new-card"
import { atom_data } from "../../lib/store"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export default function PaymentSettings() {
    const [data,] = useAtom(atom_data)
    const [card, set_card] = useState(data.current_user.credit_card === null ? "" : data.current_user.credit_card)
    const [show_window, set_show_window] = useState(false)
    useEffect(() => {
        set_card(data.current_user.credit_card === null ? "" : data.current_user.credit_card)
        set_show_window(false)

    }, [data.current_user.credit_card])
    return (
        <div>
            <main className="container">
                <article>

                    <hgroup>
                        <h1>Choose Payment Account</h1>
                        <h2></h2>
                    </hgroup>

                    <fieldset>
                        <label htmlFor="small">
                            <input type="radio" id="small" name="size" value="small" checked />
                            {card === "" ? "not provided" : <>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/visa.png" alt="visa" />
                                玉山商業銀行 {card}
                            </>}


                        </label>
                        <p></p>
                        <button role="button" className="secondary" onClick={() => set_show_window(true)}>Update</button>
                    </fieldset>
                </article>
            </main>
            {show_window === true ? <AddNewCard /> : <></>}

        </div>
    )
}