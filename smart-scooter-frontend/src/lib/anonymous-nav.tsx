import { Link } from "react-router-dom";
export default function AnonymousNav() {
    return (
        <> <nav className="container-fluid">
            <ul>
                <li>
                    <strong> Smart Scooter </strong>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul>

                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}