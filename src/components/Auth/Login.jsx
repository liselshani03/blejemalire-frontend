import { Link } from "react-router-dom";

export default function Login() {
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

          <input
            type="text"
            placeholder="Email or phone number"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button className="auth-btn">
            Log In
          </button>

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