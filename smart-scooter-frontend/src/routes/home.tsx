import AnonymousNav from "../lib/anonymous-nav";
import { useOutlet } from "react-router-dom";
export default function Home() {
    const outlet = useOutlet();
    return (
        <>
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
                <img src="image/dino-scooter.gif"></img>
            </section>
        </>
    )
}