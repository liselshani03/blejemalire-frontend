/**
 * Authentication Service
 * Handles token management, login persistence, and auth headers
 */

export class AuthService {
  static ACCESS_TOKEN_KEY = 'accessToken';
  static REFRESH_TOKEN_KEY = 'refreshToken';
  static USER_KEY = 'user';

  /**
   * Save both access and refresh tokens
   */
  static saveTokens(accessToken, refreshToken) {
    if (accessToken) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      console.log("✅ Access token saved:", accessToken.substring(0, 20) + "...");
    }
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      console.log("✅ Refresh token saved:", refreshToken.substring(0, 20) + "...");
    }
  }

  /**
   * Get access token
   */
  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get the current token (alias for getAccessToken)
   */
  static getToken() {
    return this.getAccessToken();
  }

  /**
   * Check if user is logged in
   */
  static isLoggedIn() {
    return !!this.getAccessToken();
  }

  /**
   * Save user data to localStorage
   */
  static saveUser(user) {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  /**
   * Get user data from localStorage
   */
  static getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if current user is admin
   */
  static isAdmin() {
    const user = this.getUser();
    return user && (user.role === 'admin' || user.isAdmin === true);
  }

  /**
   * Get authorization headers with Bearer token
   */
  static getHeaders() {
    const token = this.getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
    
    if (token) {
      console.log("✅ Headers with token:", { ...headers, 'Authorization': 'Bearer ' + token.substring(0, 20) + '...' });
    } else {
      console.warn("⚠️ No access token found - requests may fail!");
    }
    
    return headers;
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      console.error("❌ No refresh token available");
      return false;
    }

    try {
      console.log("🔄 Attempting to refresh access token...");
      console.log("Refresh Token:", refreshToken.substring(0, 20) + "...");
      
      const response = await fetch('http://localhost:5000/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken  // Send in body
        })
      });

      const data = await response.json();
      console.log("Refresh response:", data);

      if (response.ok && data.data && data.data.accessToken) {
        this.saveTokens(data.data.accessToken, refreshToken);
        console.log("✅ Access token refreshed successfully");
        return true;
      } else {
        console.error("❌ Token refresh failed:", data.message);
        this.logout(); // Clear tokens if refresh fails
        return false;
      }
    } catch (error) {
      console.error("❌ Error refreshing token:", error.message);
      this.logout();
      return false;
    }
  }

  /**
   * Clear all tokens and user data (logout)
   */
  static logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    console.log("✅ All tokens cleared - logged out");
  }

  /**
   * Check if token exists and is valid
   */
  static hasValidToken() {
    const token = this.getAccessToken();
    return token && token.length > 0;
  }
}
