import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import OffersToday from "./pages/OffersToday";
import AllOffers from "./pages/AllOffers";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";

import { productsAPI, cartAPI } from "./services/api";
import { AuthService } from "./services/authService";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isLoggedIn());

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getAll();
        if (response.success) {
          setProducts(response.data || []);
        } else {
          console.error("Failed to fetch products:", response.message);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          const response = await cartAPI.getCart();
          if (response.success) {
            setCart(response.data || []);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCart([]);
        }
      };
      fetchCart();
    }
  }, [isAuthenticated]);

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      console.log("🛒 Adding to cart:", { productId, quantity });
      const response = await cartAPI.addItem(productId, quantity);
      console.log("✅ Add to cart response:", response);
      
      if (response.success) {
        setCart(response.data || []);
        alert("✅ Item added to cart!");
      } else {
        console.error("❌ Add to cart failed:", response.message);
        alert(response.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error.message);
      alert(`Error: ${error.message || "Failed to add item to cart"}`);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      console.log("🗑️ Removing from cart:", productId);
      const response = await cartAPI.removeItem(productId);
      console.log("✅ Remove from cart response:", response);
      
      if (response.success) {
        setCart(response.data || []);
        alert("✅ Item removed from cart!");
      } else {
        console.error("❌ Remove failed:", response.message);
        alert(response.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("❌ Error removing from cart:", error.message);
      alert(`Error: ${error.message || "Failed to remove item from cart"}`);
    }
  };


  return (
    <BrowserRouter>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        cartCount={cart.length}
      />

      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            loading ? (
              <p>Loading products...</p>
            ) : (
              <AllOffers
                products={products}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            )
          }
        />

        <Route
          path="/offers-today"
          element={
            <OffersToday
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          }
        />

        <Route
          path="/all-offers"
          element={
            <AllOffers
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          }
        />

        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;