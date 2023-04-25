import { Link } from "react-router-dom";
export default function AnonymousNav() {
    return (
        <> <nav className="container-fluid">
            <ul>
                <li>
                    <strong> Smart Scooter </strong>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}