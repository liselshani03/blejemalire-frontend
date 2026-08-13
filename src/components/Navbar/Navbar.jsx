import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/authService";
import "./Navbar.css";

const categories = ["all", "drink", "alcoholic-drink", "food", "electronic", "jersey"];

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  isAuthenticated,
  setIsAuthenticated,
  cartCount = 0
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide search on auth pages and cart
  const hideSearch = ["/cart", "/login", "/signup", "/forgot-password"]
    .includes(location.pathname);

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/logo/blejemalire-logo.png" alt="logo" />
        </Link>
      </div>

      <div className="nav-center">
        {!hideSearch && (
          <div className="search-filters">
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

            <div className="price-filter">
              <input
                type="number"
                placeholder="Min €"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max €"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      <div className="nav-right">
        <Link to="/offers-today">OffersToday</Link>
        
        <Link to="/cart">
          Cart 🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {isAuthenticated && AuthService.isAdmin() && (
          <Link to="/admin" className="admin-link">
            📊 Admin
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <span className="user-email">
              {AuthService.getUser()?.email || "User"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}