
export default function AddAdmin() {
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Add another admin </h1>
                    <h2></h2>
                </hgroup>
                <form>
                    <div className="grid">

                        <label htmlFor="lastname">
                            New admin ID
                            <input
                                type="text"
                                value={"kevin chouchou"}
                                placeholder="Name"
                                required
                                onChange={(e) => {
                                    set_username(e.target.value)
                                }}
                            />
                        </label>
                        <button className="contrast">
                            Add
                        </button>
                    </div>
                </form>
            </article>
        </div>
    )
}