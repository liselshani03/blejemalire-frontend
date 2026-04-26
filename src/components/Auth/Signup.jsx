import "./Auth.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="auth-page">

      <div className="auth-left">
        <h1>blejemalire</h1>
        <p>Create your account and start shopping.</p>
      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <input type="text" placeholder="Full name" />
          <input type="text" placeholder="Email or phone" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />

          <button className="auth-btn">Sign Up</button>

          <Link to="/login" className="auth-link">
            Already have an account? Login
          </Link>

        </div>

      </div>

    </div>
  );
}