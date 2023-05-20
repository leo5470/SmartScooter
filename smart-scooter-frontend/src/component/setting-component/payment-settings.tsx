import AddNewCard from "./add-new-card"
import "./setting-component-css/add-new-card.css"

export default function PaymentSettings() {
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
                            <img width="48" height="48" src="https://img.icons8.com/color/48/visa.png" alt="visa"/>
                            玉山商業銀行 **** 1234
                        </label>
                        <label htmlFor="small">
                            <input type="radio" id="small" name="size" value="small" checked />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard"/>
                            兆豐國際商業銀行 **** 5678
                        </label>
                        <p></p>
                        <a href="#" role="button" className="secondary">➕ Add New Card</a>
                    </fieldset>
                </article>
            </main>
            <AddNewCard />
        </div>
    )
}