import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import grihomLogo from '../../assets/grihom-logo.svg';
import './Header.css';

const Header = ({ user, onLoginClick, onLogout, theme, onToggleTheme }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const closeMenu = () => setShowMenu(false);

  const handleLogoutClick = () => {
    closeMenu();
    onLogout();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="header">
      <nav className="navbar">

        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <img src={grihomLogo} alt="GriHom logo" className="brand-logo" />
            <span>GriHom</span>
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/ideas" className={location.pathname === '/ideas' ? 'active' : ''}>Ideas</Link>
          </li>
          <li>
            <Link
              to="/report"
              className={`${location.pathname === '/report' ? 'active' : ''} nav-report-link`}
            >
              Get Report
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </li>
          )}

          {user?.isAdmin && (
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          {!user ? (
            <button onClick={onLoginClick} className="btn btn-primary">
              🔑 Sign In
            </button>
          ) : (
            <div className="profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className={`profile-menu-btn ${showMenu ? 'active' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Open user menu"
                title={user?.name || 'User'}
              >
                <span className="profile-pill">{userInitial}</span>
              </button>

              {showMenu && (
                <div className="kebab-dropdown">
                  <Link to="/profile" className="kebab-item" onClick={closeMenu}>👤 Profile</Link>
                  <Link to="/report" className="kebab-item" onClick={closeMenu}>🏠 New Report</Link>
                  <button onClick={handleLogoutClick} className="kebab-item logout">🚪 Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Header;
