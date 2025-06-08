import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "../styles/Auth.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1800);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        alert("❌ Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        alert("❌ Invalid email address.");
      } else if (err.code === "auth/user-not-found") {
        alert("❌ No user found with this email.");
      } else {
        alert("❌ Login failed: " + err.message);
      }
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          createdAt: new Date(),
          provider: "google",
        });
      }

      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1800);
    } catch (error) {
      alert("Google login failed: " + error.message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) return setResetMessage("❌ Enter an email address.");

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("📩 Password reset email sent!");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setResetMessage("❌ No user found with that email.");
      } else if (error.code === "auth/invalid-email") {
        setResetMessage("❌ Invalid email format.");
      } else {
        setResetMessage("❌ " + error.message);
      }
    }
  };

  return (
    <>
      {(loading || success) && (
        <div className="loading-overlay">
          <div className="spinner-container">
            {!success ? (
              <>
                <div className="spinner"></div>
                <p className="loading-text">Logging in…</p>
              </>
            ) : (
              <>
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark__check" fill="none" d="M14 27l7 7 16-16" />
                </svg>
                <p className="loading-text">Welcome back!</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Forgot password modal */}
      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            <p>{resetMessage}</p>
            <button className="close-btn" onClick={() => setShowResetModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="auth-container">
        <h2>Login</h2>
        <AuthForm onSubmit={onSubmit} type="login" disabled={loading || success} />

        <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading || success}>
          Continue with Google
        </button>

        <div className="auth-links">
          <p>
            Don’t have an account? <Link to="/">Register</Link>
          </p>
          <div className="forgot-password">
            <a href="#" onClick={() => setShowResetModal(true)}>Forgot password?</a>
          </div>
        </div>
      </div>
    </>
  );
}
