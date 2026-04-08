import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onLogin, onSwitchToRegister, onClose, error, loading }) => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="auth-modal">
      <div className="auth-container premium-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h2>Welcome to GriHom</h2>
          <p>Sign in to access personalized home improvement insights</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Enter your email"
              required
              className="premium-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              required
              className="premium-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary full-width"
          >
            {loading ? 'Signing In...' : '🔑 Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? 
            <button onClick={onSwitchToRegister} className="link-btn">
              Create one here
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <div className="demo-cards">
            <div className="demo-card">
              <strong>Homeowner:</strong> register and sign in
            </div>
            <div className="demo-card">
              <strong>Admin:</strong> admin@homevalue.com / admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;