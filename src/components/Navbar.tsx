import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <i className="bi bi-shield-lock me-2"></i>
          Tancrypt
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                to="/dashboard"
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/tokens') ? 'active' : ''}`} 
                to="/tokens"
              >
                <i className="bi bi-plus-circle me-1"></i>
                Generate Token
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/history') ? 'active' : ''}`} 
                to="/history"
              >
                <i className="bi bi-clock-history me-1"></i>
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`} 
                to="/settings"
              >
                <i className="bi bi-gear me-1"></i>
                Settings
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button 
              className="btn btn-link theme-toggle me-3" 
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>

            <div className="dropdown">
              <button 
                className="btn btn-outline-primary dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-1"></i>
                {user?.name}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;