import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const categories = ["all", "drink", "alcoholic-drink", "food", "electronic", "jersey"];

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const location = useLocation();

  // faqet ku e hekim search buttonin edhe category
  const hideSearch = ["/cart", "/login", "/signup", "/forgot-password"]
    .includes(location.pathname);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/all-offers">
          <img src="/logo/blejemalire-logo.png" alt="logo" />
        </Link>
      </div>

      <div className="nav-center">
        {!hideSearch && (
          <>
            <input
              className="search-bar"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

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
          </>
        )}
      </div>

      <div className="nav-right">
        <Link to="/offers-today">OffersToday</Link>
        <Link to="/cart">Cart 🛒</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}