import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { adminAPI } from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    old_price: "",
    category: "",
    image: "",
    store: "",
    discount_ends_at: "",
  });

  // Check if user is admin
  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (!AuthService.isAdmin()) {
      alert("❌ You don't have permission to access this page");
      navigate("/");
      return;
    }

    fetchStats();
    fetchProducts();
  }, [navigate]);

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load stats");
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllProducts();
      if (response.success) {
        setProducts(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    if (!formData.name || !formData.price || !formData.category) {
      setError("❌ Please fill in all required fields");
      return;
    }

    try {
      console.log("📦 Adding product with data:", {
        ...formData,
        price: parseFloat(formData.price) // Ensure price is a number
      });
      
      const response = await adminAPI.addProduct(formData);
      console.log("📦 Backend response:", response);

      if (response.success) {
        setSuccessMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          old_price: "",
          category: "",
          image: "",
          store: "",
          discount_ends_at: "",
        });
        
        // Refresh products list
        setTimeout(() => fetchProducts(), 1000);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(`❌ ${response.message || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("❌ Full error object:", error);
      console.error("❌ Error response:", error.message);
      setError(`❌ ${error.message || "Error adding product"}`);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (!confirm("⚠️ Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await adminAPI.deleteProduct(productId);
      if (response.success) {
        setSuccessMessage("✅ Product deleted successfully!");
        fetchProducts();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(`❌ ${response.message || "Failed to delete product"}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(`❌ ${error.message || "Error deleting product"}`);
    }
  };

  const user = AuthService.getUser();

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* HEADER */}
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Welcome, {user?.email}</p>
        </div>

        {/* STATS SECTION */}
        {stats && (
          <div className="stats-section">
            <h2>Dashboard Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-number">{stats.totalProducts || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-number">{stats.totalOrders || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-number">${stats.totalRevenue ? parseFloat(stats.totalRevenue).toFixed(2) : "0.00"}</p>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-number">{stats.activeUsers || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {error && <div className="alert alert-error">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* ADD PRODUCT FORM */}
        <div className="form-section">
          <h2>➕ Add New Product</h2>
          <form onSubmit={handleAddProduct} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., iPhone 15 Pro"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 799.99"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Original Price *</label>
                <input
                  type="number"
                  name="old_price"
                  placeholder="e.g., 999.99"
                  value={formData.old_price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="drink">Drink</option>
                  <option value="alcoholic-drink">Alcoholic Drink</option>
                  <option value="food">Food</option>
                  <option value="electronic">Electronic</option>
                  <option value="jersey">Jersey</option>
                </select>
              </div>
              <div className="form-group">
                <label>Discount End Date</label>
                <input
                  type="date"
                  name="discount_ends_at"
                  value={formData.discount_ends_at}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Store</label>
                <input
                  type="text"
                  name="store"
                  placeholder="e.g., Amazon, eBay"
                  value={formData.store}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://..."
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              ➕ Add Product
            </button>
          </form>
        </div>

        {/* PRODUCTS LIST */}
        <div className="products-section">
          <h2>📦 All Products ({products.length})</h2>
          
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Original Price</th>
                    <th>Category</th>
                    <th>Store</th>
                    <th>Discount Until</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${parseFloat(product.price).toFixed(2)}</td>
                      <td>${parseFloat(product.old_price).toFixed(2)}</td>
                      <td>{product.category}</td>
                      <td>{product.store || "N/A"}</td>
                      <td>{product.discount_ends_at ? new Date(product.discount_ends_at).toLocaleDateString() : "N/A"}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
