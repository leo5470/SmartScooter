import { Link } from "react-router-dom";

export default function UserNav() {
    return (
        <> <nav className="container-fluid">
            <ul>
                <li>
                    <strong> Smart Scooter - User </strong>
                </li>
                <li>
                    <Link to="/user/map">Map</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/user/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}