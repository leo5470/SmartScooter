
export default function AccountSettings() {
    return (
        <main className="container">
            <article>
                <div>
                    <hgroup>
                        <h1>Account Settings</h1>
                        <h2></h2>
                    </hgroup>
                    <form>
                     <label htmlFor="firstname">
                            First name
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="First name"
                                required
                            />
                        </label>

                        <label htmlFor="lastname">
                            Last name
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Last name"
                                required
                            />
                        </label>


                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email address"
                            required
                        />

                        <label htmlFor="city">City</label>
                        <select id="city" required>
                            <option value="" selected>Select a City</option>
                            <option>…</option>
                        </select>
                        <label htmlFor="district">District</label>
                        <select id="district" required>
                            <option value="" selected>Select a district</option>
                            <option>…</option>
                        </select>
                        <label htmlFor="street">
                            Street
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="羅斯福路四段1號"
                                required
                            />
                        </label>

                        <label htmlFor="lastname">
                            Phone number
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Your number"
                                required
                            />
                        </label>
                        <label htmlFor="lastname">
                            Password
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                autoComplete="current-password"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="contrast"
                            onClick="event.preventDefault()"
                        >Save Change</button>
                    </form>
                </div>
                <div />
            </article>
        </main>
    )
}