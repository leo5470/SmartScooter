import { useOutlet } from "react-router-dom";
import UserNav from "../component/user-nav"
import Showcase from "../component/showcase";

import { useAtom } from "jotai";
import { atom_data } from "../lib/store";
import { Navigate } from "react-router-dom";

export default function User() {
    const outlet = useOutlet();
    const [data , ] = useAtom(atom_data);
    return (
        <>
            <UserNav></UserNav>
            <main className="container">
            {data.current_user.id == -1? <Navigate to="/"/>:""}
                {outlet || <Showcase modelLocation={[-0.5, -2, 0]} modelRotation={[0, Math.PI / 5, 0]} modelScale={3.4} text="Welcome Back!" modelName="scooter" textLocation={[-3.8, -0.4, 3]}></Showcase>}
            </main>
        </>
    )
}

