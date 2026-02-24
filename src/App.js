import React, { useState } from 'react';
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
import DecorPage from './pages/DecorPage/DecorPage';
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
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

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
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/decor" element={<DecorPage />} />
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