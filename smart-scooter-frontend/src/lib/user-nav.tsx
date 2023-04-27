import { Link } from "react-router-dom";
export default function UserNav() {
    return (
        <> <nav className="container-fluid">
            <ul>
                <li>
                    <strong> Smart Scooter - User </strong>
                </li>
                <li>
                    <Link to="/user/rent">Rent</Link>
                </li>
                <li>
                    <Link to="/user/search">Search</Link>
                </li>
                <li>
                    <Link to="/user/recharge">Recharge</Link>
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