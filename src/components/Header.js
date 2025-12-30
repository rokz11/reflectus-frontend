import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src={logo}
            alt="ReflectUS"
            className="logo-image"
          />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">
          Create session
        </Link>
        <Link to="/join" className="nav-link">
          Join session
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </nav>
    </header>
  );
}
