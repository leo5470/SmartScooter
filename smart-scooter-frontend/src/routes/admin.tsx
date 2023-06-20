import { useOutlet } from "react-router-dom";
import AdminNav from "../component/admin-nav"
import Showcase from "../component/showcase";
import { atom_data } from "../lib/store";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
export default function Admin() {
    const outlet = useOutlet();
    const [data , _] = useAtom(atom_data)
    return (
        <>
            <AdminNav></AdminNav>
            <main className="container">
            {data.current_user.id == -1? <Navigate to="/"/>:""}
                {outlet || <Showcase modelLocation={[-0.5, -2, 0]} modelRotation={[0, Math.PI * (1.65), -0.05]} modelScale={30} text="Start Working!" modelName="terminal" textLocation={[-3.8, -0.4, 3]}></Showcase>}
            </main>
        </>
    )
}