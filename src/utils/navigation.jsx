import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navigation.css"
import { ArrowIcon, Logo } from "./Icon";

const MOBILE_BREAKPOINT = 600;

const navItems = [
  { to: "/", label: "Home" },
  { to: "/feature", label: "Explore" },
  { to: "/about", label: "About Us" },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <div className="nav-wrapper">
      <nav className="nav-bar">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <Logo />
          </div>
          <span className="nav-logo-name">Candelay</span>
        </div>

        <div className="nav-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${pathname === item.to ? "active" : ""}`}
            >
              {pathname === item.to && <span className="nav-dot" />}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <div className="nav-divider" />
          <button className="nav-cta">
            Feedback
            <ArrowIcon />
          </button>

          <button
            type="button"
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-hamburger-icon">
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
            </span>
          </button>
        </div>

        {menuOpen && (
          <>
            <div className="nav-mobile-backdrop" onClick={closeMenu} />
            <div className="nav-mobile-menu">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-mobile-link ${pathname === item.to ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <button className="nav-mobile-cta" onClick={closeMenu}>
                Feedback
                <ArrowIcon />
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
