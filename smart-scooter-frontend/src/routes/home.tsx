import AnonymousNav from "../component/anonymous-nav";
import { useOutlet , Navigate } from "react-router-dom";

import Showcase from "../component/showcase";

import { useAtom } from "jotai";

import { atom_data } from "../lib/store";

export default function Home() {
    const outlet = useOutlet();
    const [data , ] = useAtom(atom_data);
    return (
        <>
            {data.current_user.id != -1? data.current_user.is_admin === true?<Navigate to="/admin"/>: <Navigate to="/user"/>:""}
            <AnonymousNav></AnonymousNav>
            <main className="container">
                {outlet || <HomeContent></HomeContent>}
            </main>
        </>
    )
}

function HomeContent() {
    return (
        <>
            <section>
                <hgroup>
                    <h1>Smart Scooter Platform</h1>
                    <h2>Effortlessly Intelligent</h2>
                </hgroup>
                <Showcase text="" modelLocation={[-20, 0, -100]} modelScale={0.05} modelRotation={[0.3, -1.4, 0]} textLocation={[0, 0, 0]} modelName="city"></Showcase>
            </section>
        </>
    )
}