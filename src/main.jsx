import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthService } from './services/authService'
import { cartAPI, productsAPI, adminAPI } from './services/api'

// Make AuthService available in browser console for debugging
window.AuthService = AuthService;

window.testAuth = () => {
  console.log("🔍 Auth Debug Info:");
  console.log("Access Token:", AuthService.getAccessToken() ? "✅ Present" : "❌ Missing");
  console.log("Refresh Token:", AuthService.getRefreshToken() ? "✅ Present" : "❌ Missing");
  console.log("Is Logged In:", AuthService.isLoggedIn() ? "✅ Yes" : "❌ No");
  console.log("Is Admin:", AuthService.isAdmin() ? "✅ Yes" : "❌ No");
  console.log("Headers:", AuthService.getHeaders());
  console.log("User:", AuthService.getUser());
};

window.testRefresh = async () => {
  console.log("🔄 Testing token refresh...");
  const success = await AuthService.refreshAccessToken();
  if (success) {
    console.log("✅ Token refreshed successfully");
    window.testAuth();
  } else {
    console.error("❌ Token refresh failed");
  }
};

// Test cart endpoints
window.testCart = async () => {
  console.log("🛒 Testing Cart Endpoints...");
  try {
    const products = await productsAPI.getAll();
    console.log("✅ Get Products:", products.data?.length, "products");
    
    if (!AuthService.isLoggedIn()) {
      console.warn("⚠️ Not logged in! Cart endpoints need authentication.");
      return;
    }
    
    console.log("📡 Testing GET /api/cart...");
    const cart = await cartAPI.getCart();
    console.log("✅ Get Cart:", cart);
    
    if (products.data && products.data.length > 0) {
      const firstProduct = products.data[0];
      console.log("📡 Testing POST /api/cart (add product)...");
      const addResponse = await cartAPI.addItem(firstProduct.id, 1);
      console.log("✅ Add Item:", addResponse);
    }
  } catch (err) {
    console.error("❌ Cart test error:", err.message);
  }
};

// Test admin endpoints with detailed debugging
window.testAdmin = async () => {
  console.log("📊 Testing Admin Endpoints...");
  
  // Get token directly from localStorage
  const token = localStorage.getItem('accessToken');
  console.log("🔑 Token from localStorage:", token ? token.substring(0, 30) + "..." : "❌ NO TOKEN");
  
  if (!token) {
    console.warn("⚠️ No access token found! Please login first.");
    return;
  }
  
  // Check user object
  const user = AuthService.getUser();
  console.log("👤 User object:", user);
  console.log("Is Admin (per localStorage):", AuthService.isAdmin() ? "✅ Yes" : "❌ No");
  
  // Make raw API call to test the token
  try {
    console.log("\n📡 Testing raw token with GET /api/admin/products/stats...");
    const response = await fetch('http://localhost:5000/api/admin/products/stats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("📊 Response Status:", response.status);
    console.log("Response OK:", response.ok ? "✅ Yes" : "❌ No");
    
    const data = await response.json();
    console.log("📊 Response Data:", data);
    
    if (response.ok) {
      console.log("✅ Token is valid! Admin endpoint works!");
    } else {
      console.log("❌ Token rejected:", data.message);
    }
  } catch (err) {
    console.error("❌ Raw fetch error:", err.message);
  }
  
  // Also try via adminAPI for comparison
  console.log("\n📡 Testing via adminAPI.getStats()...");
  try {
    const stats = await adminAPI.getStats();
    console.log("✅ Admin Stats:", stats);
  } catch (err) {
    console.error("❌ adminAPI.getStats() error:", err.message);
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
