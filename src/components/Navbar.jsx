import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <Link to="/offers-today">24h</Link>
            <Link to="/all-offers">Te-gjitha</Link>
            <Link to="/cart">Shporta🛒</Link>
        </nav>
    );
}