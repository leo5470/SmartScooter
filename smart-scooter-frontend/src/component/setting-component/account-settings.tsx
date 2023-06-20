// @ts-nocheck
import Select from 'react-select';
import { useState } from "react"
import { atom_data } from '../../lib/store';
import { useAtom } from 'jotai';
import { change_user_info, sync_user } from '../../lib/utils';
import { toast } from 'react-toastify';

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
    const [data , set_data] =  useAtom(atom_data)
    const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
    const [selectedDistrict, setSelectedDistrict] = useState(districtOptions[0]);
    const [username , set_username] = useState(data.current_user.username)
    const [email , set_email] = useState(data.current_user.email)
    const [phone , set_phone] = useState(data.current_user.telephone_number === null? "":data.current_user.telephone_number)
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

                            <label htmlFor="lastname">
                                Name
                                <input
                                    type="text"
                                    value={username}
                                    placeholder="Name"
                                    required
                                    onChange={(e)=>{
                                        set_username(e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Email address"
                            required
                            onChange={(e)=>{
                                set_email(e.target.value)
                            }}
                        />
                        <label htmlFor="lastname">
                            Phone number
                            <input
                                type="tel"
                                value={phone}
                                placeholder="Your number"
                                required
                                onChange={(e)=>{
                                    set_phone(e.target.value)
                                }}
                            />
                        </label>
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
                                value={"羅斯福路四段1號"}
                                placeholder="your address"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="contrast"
                            onClick={(event) => {
                                event.preventDefault()
                                change_user_info(username , email , phone)
                                toast("Changes saved")
                            }}
                        >Save Change</button>
                    </form>
                </div>
                <div />
            </article>
        </main>
    )
}