import "./login.scoped.css"
import { useState } from "react"
import { login } from "../lib/utils";
export default function Login() {
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [error_message , set_error_message] = useState("");
    return (
        <>
            <section>
                <article className="grid login" >
                    <div>
                        <h1>Sign in</h1>
                        <form>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                aria-label="Username"
                                required
                                value={username}
                                onChange={(event) => {
                                    set_username(event.target.value)
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
                            <button className="contrast" onClick={async (event) => {
                                event.preventDefault()
                                try{
                                    await login(username, password)
                                    set_error_message("")
                                }
                                catch(e){
                                    set_error_message(e as string)
                                }
                            }} >Login</button>
                        </form>
                        <p>{error_message}</p>
                    </div>
                    <div></div>
                </article>
            </section>
        </>
    );
}