import Select from 'react-select';
import { useState } from "react"

export default function AccountSettings() {
    const cityOptions = [
        {
            value: "taipei", label: "Taipei"
        }
    ]
    const districtOptions = [
        {
            value: "daan", label: "Daan district"
        }
    ]
    const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
    const [selectedDistrict, setSelectedDistrict] = useState(districtOptions[0]);
    return (
        <main className="container">
            <article>
                <div>
                    <hgroup>
                        <h1>Account Settings</h1>
                        <h2>Add information about yourself</h2>
                    </hgroup>
                    <form>
                        <div className="grid">
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
                        </div>
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email address"
                            required
                        />
                        <div></div>
                        <div className="grid">
                            <div>
                                <label htmlFor="city">City</label>
                                <Select
                                    defaultValue={selectedCity}
                                    onChange={setSelectedCity}
                                    options={cityOptions}
                                />

                            </div>
                            <div>
                                <label htmlFor="district">District</label>
                                <Select
                                    defaultValue={selectedDistrict}
                                    onChange={setSelectedDistrict}
                                    options={districtOptions}
                                />
                            </div>
                        </div>
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
                            onClick={(event) => event.preventDefault()}
                        >Save Change</button>
                    </form>
                </div>
                <div />
            </article>
        </main>
    )
}