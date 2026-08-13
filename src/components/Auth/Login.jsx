import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { AuthService } from "../../services/authService";
import "./Auth.css";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      
      if (response.success && response.data.accessToken) {
        // Save both access and refresh tokens using AuthService
        AuthService.saveTokens(response.data.accessToken, response.data.refreshToken);
        AuthService.saveUser(response.data.user);
        
        // Update parent state
        setIsAuthenticated(true);
        
        // Redirect to home
        navigate("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>BlejeMaLire</h1>
        <p>Find the best deals in one place.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          <h2>Login</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* FORGOT PASSWORD */}
          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>

          <hr className="auth-divider" />

          {/* SIGNUP */}
          <Link to="/signup">
            <button className="auth-btn-secondary">
              Create new account
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}