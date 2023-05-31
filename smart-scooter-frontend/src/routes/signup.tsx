import "./signup.scoped.css"
export default function Signup() {
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
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                aria-label="Email"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                aria-label="Password"
                                required
                            />
                            <button type="submit" >Sign up</button>
                        </form>
                    </div>
                    <div></div>
                </article>
            </section>
        </>
    );
}