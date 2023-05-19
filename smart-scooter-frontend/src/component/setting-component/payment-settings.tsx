import "./setting-component-css/payment-settings.css"

export default function PaymentSettings() {
    return (
        <div>
            {/* Search */}
            <input type="search" id="search" name="search" placeholder="Search" />
            {/* File browser */}
            <label htmlFor="file">File browser
                <input type="file" id="file" name="file" />
            </label>
            {/* Range slider */}
            <label htmlFor="range">Range slider
                <input type="range" min={0} max={100} defaultValue={50} id="range" name="range" />
            </label>
            {/* Date */}
            <label htmlFor="date">Due date
                <input type="month" id="month" name="month" />
            </label>
            {/* Time */}
            <label htmlFor="time">Time
                <input type="time" id="time" name="time" />
            </label>
            {/* Color */}
            <label htmlFor="color">Color
                <input type="color" id="color" name="color" defaultValue="#0eaaaa" />
            </label>
            <>
                <section>
                    <article className="grid">
                        <div>
                            <h1>Add New Card</h1>
                            <form>
                                <input
                                    type="text"
                                    name="login"
                                    placeholder="Login"
                                    aria-label="Login"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    required
                                />
                                <fieldset>
                                    <label htmlFor="remember">
                                        <input type="checkbox" role="switch" id="remember" name="remember" />
                                        Remember me
                                    </label>
                                </fieldset>
                                <button type="submit" className="contrast" >Login</button>
                            </form>
                        </div>
                        <div></div>
                    </article>
                </section>
            </>
        </div>


    )
}