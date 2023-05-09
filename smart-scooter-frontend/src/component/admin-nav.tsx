import { Link } from "react-router-dom";
export default function UserNav() {
    return (
        <> <nav className="container-fluid">
            <ul>
                <li>
                    <strong> Smart Scooter - Admin </strong>
                </li>
                <li>
                    <Link to="/admin/search">Search</Link>
                </li>
                <li>
                    <Link to="/admin/repair">Repair</Link>
                </li>
                <li>
                    <Link to="/admin/recharge">Recharge</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}