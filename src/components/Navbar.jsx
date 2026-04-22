import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, showSearch}) {

  const categories = ["all", "drink", "alcoholic-drink", "food", "electronic", "jersey"];

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/All-Offers">
          <img src="/logo/blejemalire-logo.png" alt="logo" />
        </Link>
      </div>

      <div className="nav-center">

        {showSearch && (
          <input
            className="search-bar"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}

        {showSearch && (
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* RIGHT LINKS */}
      <div className="nav-right">
        <Link to="/offers-today">OffersToday</Link>
        <Link to="/cart">Cart 🛒</Link>
      </div>

    </nav>
  );
}