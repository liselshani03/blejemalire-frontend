import { AuthService } from "./authService";

const API_BASE_URL = "http://localhost:5000";

// Helper function to make requests with auth headers and auto-refresh
const makeRequest = async (endpoint, options = {}) => {
  const authHeaders = AuthService.getHeaders();
  const headers = {
    ...options.headers,
    ...authHeaders, // AuthService headers take priority (especially Authorization)
  };

  console.log(`📡 [${options.method || 'GET'}] ${endpoint}`, { 
    hasAuth: !!headers['Authorization'],
    authHeader: headers['Authorization'] ? headers['Authorization'].substring(0, 30) + '...' : 'NONE'
  });

  try {
    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If 401 (Unauthorized), try to refresh token and retry
    if (response.status === 401 && options.method !== 'POST') {
      console.warn("⚠️ Got 401 - attempting token refresh...");
      
      const refreshed = await AuthService.refreshAccessToken();
      
      if (refreshed) {
        // Retry request with new token
        console.log("🔄 Retrying request with new token...");
        const newHeaders = {
          ...options.headers,
          ...AuthService.getHeaders(),
        };
        
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      } else {
        // Refresh failed - user needs to login again
        throw new Error("Session expired. Please login again.");
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  signup: async (email, password) => {
    return makeRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  login: async (email, password) => {
    return makeRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};

// ===== PRODUCTS ENDPOINTS =====
export const productsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.search) params.append("search", filters.search);

    const query = params.toString();
    const endpoint = query ? `/api/products?${query}` : "/api/products";
    return makeRequest(endpoint);
  },

  search: async (query) => {
    return makeRequest(`/api/products/search?q=${encodeURIComponent(query)}`);
  },

  getById: async (id) => {
    return makeRequest(`/api/products/${id}`);
  },

  getByStore: async (storeId) => {
    return makeRequest(`/api/products/store/${storeId}`);
  },
};

// ===== CART ENDPOINTS =====
export const cartAPI = {
  getCart: async () => {
    return makeRequest("/api/cart");
  },

  addItem: async (productId, quantity = 1) => {
    return makeRequest("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateQuantity: async (productId, quantity) => {
    return makeRequest(`/api/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  },

  removeItem: async (productId) => {
    return makeRequest(`/api/cart/${productId}`, {
      method: "DELETE",
    });
  },

  clearCart: async () => {
    return makeRequest("/api/cart", {
      method: "DELETE",
    });
  },
};

// ===== ADMIN ENDPOINTS =====
export const adminAPI = {
  addProduct: async (productData) => {
    return makeRequest("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  getStats: async () => {
    return makeRequest("/api/admin/products/stats");
  },

  getAllProducts: async () => {
    return makeRequest("/api/products");
  },

  updateProduct: async (productId, productData) => {
    return makeRequest(`/api/admin/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (productId) => {
    return makeRequest(`/api/admin/products/${productId}`, {
      method: "DELETE",
    });
  },
};

// ===== HEALTH CHECK =====
export const healthAPI = {
  check: async () => {
    return makeRequest("/");
  },
};
