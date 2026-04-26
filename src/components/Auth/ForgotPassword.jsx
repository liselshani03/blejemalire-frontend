import "./Auth.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="auth-page">

      <div className="auth-left">
        <h1>BlejeMaLire</h1>
        <p></p>
        <p>Reset your password securely.</p>
      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Forgot Password</h2>

          <input type="text" placeholder="Email or phone" />

          <button className="auth-btn">Send Reset Link</button>

          <Link to="/login" className="auth-link">
            Back to login
          </Link>

        </div>

      </div>

    </div>
  );
}