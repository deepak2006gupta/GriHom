import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import apiService from './services/api';
import HomePage from './pages/HomePage/HomePage';
import IdeasPage from './pages/IdeasPage/IdeasPage';
import ReportPage from './pages/ReportPage/ReportPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminImprovementsPage from './pages/AdminImprovementsPage/AdminImprovementsPage';
import { getThemePreference, saveThemePreference } from './utils/storage';
import './App.css';

const LoginRequiredAlert = ({ title, description, onLoginClick }) => (
  <section className="login-required-wrap">
    <div className="login-required-card classic-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" className="btn btn-primary" onClick={onLoginClick}>
        🔐 Login to Continue
      </button>
    </div>
  </section>
);

function App() {
  const getInitialTheme = useMemo(
    () => () => {
      const savedTheme = getThemePreference();
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }

      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      return 'light';
    },
    []
  );

  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    saveThemePreference(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = async ({ email, password }) => {
    setAuthLoading(true);
    setAuthError('');

    try {
      const loggedInUser = await apiService.login(email, password);
      setUser(loggedInUser);
      setShowAuth(false);
    } catch (error) {
      setAuthError(error.message || 'Failed to sign in.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setAuthLoading(true);
    setAuthError('');

    try {
      const registeredUser = await apiService.register(name, email, password);
      setUser(registeredUser);
      setShowAuth(false);
    } catch (error) {
      setAuthError(error.message || 'Failed to register account.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.clearToken();
    setUser(null);
  };

  const openLogin = () => {
    setAuthError('');
    setAuthMode('login');
    setShowAuth(true);
  };

  const switchToRegister = () => {
    setAuthError('');
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthError('');
    setAuthMode('login');
  };

  const closeAuth = () => {
    setAuthError('');
    setShowAuth(false);
  };

  return (
    <Router basename={process.env.PUBLIC_URL || '/'}>
      <div className="App">
        <Header 
          user={user} 
          onLoginClick={openLogin} 
          onLogout={handleLogout} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route 
              path="/report" 
              element={
                user ? (
                  <ReportPage user={user} />
                ) : (
                  <LoginRequiredAlert
                    title="Login Required for Report Generation"
                    description="Please sign in to generate your personalized GriHom report and save report results."
                    onLoginClick={openLogin}
                  />
                )
              } 
            />
            <Route 
              path="/admin" 
              element={
                user?.isAdmin ? <AdminPanel currentUser={user} /> : <HomePage />
              } 
            />
            <Route 
              path="/admin/suggestions" 
              element={
                user?.isAdmin ? <AdminImprovementsPage currentUser={user} /> : <HomePage />
              } 
            />
            <Route 
              path="/admin/improvements" 
              element={
                user?.isAdmin ? <AdminImprovementsPage currentUser={user} /> : <HomePage />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard user={user} />
                ) : (
                  <LoginRequiredAlert
                    title="Login Required for Reports"
                    description="Please sign in to view your generated reports and report history."
                    onLoginClick={openLogin}
                  />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? (
                  <ProfilePage user={user} />
                ) : (
                  <LoginRequiredAlert
                    title="Login Required for Profile"
                    description="Please sign in to view your profile details."
                    onLoginClick={openLogin}
                  />
                )
              } 
            />
          </Routes>
        </main>

        {showAuth && (
          authMode === 'login' ? (
            <Login 
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
              onClose={closeAuth}
              error={authError}
              loading={authLoading}
            />
          ) : (
            <Register 
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
              onClose={closeAuth}
              error={authError}
              loading={authLoading}
            />
          )
        )}
      </div>
    </Router>
  );
}

export default App;