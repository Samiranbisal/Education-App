import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        navigate("/login"); // redirect after logout
      } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to log out.");
      }
    };

    doLogout();
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Logging out…</h2>
    </div>
  );
}
