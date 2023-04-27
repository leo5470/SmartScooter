import { useOutlet } from "react-router-dom";
import UserNav from "../lib/user-nav"
import Showcase from "../lib/showcase";

import * as THREE from 'three'

export default function User() {
    const outlet = useOutlet();
    return (
        <>
            <UserNav></UserNav>
            <main className="container">
                {outlet || <Showcase modelLocation={[-0.5, -2, 0]} modelRotation={[0, Math.PI / 5, 0]} modelScale={3.4} text="Welcome Back!" modelName="scooter" textLocation={[-3.8, -0.4, 3]}></Showcase>}
            </main>
        </>
    )
}

