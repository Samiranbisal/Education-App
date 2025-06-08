// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "./HeaderFooter.css";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useAuthState(auth);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/dashboard" className="logo">EduSite</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            {user ? (
              <>
                {/* <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li> */}
                <li><Link to="/logout" onClick={() => setMenuOpen(false)}>Logout</Link></li>
              </>
            ) : (
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
