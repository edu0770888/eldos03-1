import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Башкы бет">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3.5 19 7.4v9.2l-7 3.9-7-3.9V7.4l7-3.9Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="m8.7 12 2.2 2.2 4.5-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>Ынтымак</span>
      </NavLink>
      <nav className="site-nav" aria-label="Негизги навигация">
        <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/" end>
          Башкы
        </NavLink>
        {user ? (
          <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/profile">
            Профиль
          </NavLink>
        ) : (
          <>
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/login">
              Кирүү
            </NavLink>
            <NavLink className="nav-link nav-link-cta" to="/register">
              Катталуу
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}