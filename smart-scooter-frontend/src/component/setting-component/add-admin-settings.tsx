import { useState } from "react"
import { add_admin } from "../../lib/utils";
import { toast } from "react-toastify";

export default function AddAdmin() {
    const [target, set_target] = useState("");
    const [error, set_error] = useState("");
    return (
        <div>
            <article>
                <hgroup>
                    <h1>Add another admin </h1>
                    <h2></h2>
                </hgroup>
                <form>
                    <div>

                        <label htmlFor="lastname">
                            New admin ID
                            <input
                                type="text"
                                value={target}
                                placeholder="Name"
                                onChange={(e) => {
                                    set_target(e.target.value)
                                }}
                            />
                        </label>
                        <button className="contrast" onClick={async(e) => {
                            e.preventDefault();
                            try{
                                await add_admin(target)
                                toast(`Promoted ${target} as admin`)
                                set_error("")
                            }catch(e){
                                set_error(e as string)
                            }

                        }}>
                            Add
                        </button>
                        <p>
                            {error}
                        </p>
                    </div>
                </form>
            </article>
        </div>
    )
}