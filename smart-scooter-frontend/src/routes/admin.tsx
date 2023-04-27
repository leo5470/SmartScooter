import { useOutlet } from "react-router-dom";
import AdminNav from "../lib/admin-nav"
import Showcase from "../lib/showcase";

export default function Admin() {
    const outlet = useOutlet();
    return (
        <>
            <AdminNav></AdminNav>
            <main className="container">
                {outlet || <Showcase modelLocation={[-0.5, -2, 0]} modelRotation={[0, Math.PI * (1.65), -0.05]} modelScale={30} text="Start Working!" modelName="terminal" textLocation={[-3.8, -0.4, 3]}></Showcase>}
            </main>
        </>
    )
}