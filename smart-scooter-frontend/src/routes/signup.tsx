import { signup } from "../lib/utils";
import "./signup.scoped.css"
import { useState } from "react";
export default function Signup() {
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [email, set_email] = useState("");
    const [error_message, set_error_message] = useState("");
    return (
        <>
            <section>
                <article className="grid login" >
                    <div>
                        <h1>Sign up</h1>
                        <form>
                            <input
                                type="text"
                                name="username"
                                placeholder="User"
                                aria-label="User"
                                required
                                value={username}
                                onChange={(event) => {
                                    set_username(event.target.value)
                                }}
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                aria-label="Email"
                                required
                                value={email}
                                onChange={(event) => {
                                    set_email(event.target.value)
                                }}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                required
                                value={password}
                                onChange={(event) => {
                                    set_password(event.target.value)
                                }}
                            />
                            <button type="submit" onClick={async (event) => {
                                event.preventDefault()
                                try {
                                    await signup(username, email, password)
                                    set_error_message("")
                                }
                                catch (e) {
                                    set_error_message(e as string)
                                }
                            }} >Sign up</button>
                        </form>
                        <p>{error_message}</p>
                    </div>
                    <div></div>
                </article>
            </section>
        </>
    );
}