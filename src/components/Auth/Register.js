import React, { useState } from 'react';
import './Auth.css';

const Register = ({ onRegister, onSwitchToLogin, onClose, error: authError, loading }) => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setError('');
    onRegister({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <div className="auth-modal">
      <div className="auth-container premium-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <div className="auth-icon">🎉</div>
          <h2>Join GriHom</h2>
          <p>Create your account to start your home improvement journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {(error || authError) && <div className="error-message">{error || authError}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter your phone number"
              className="premium-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a password"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              required
              className="premium-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary full-width"
          >
            {loading ? 'Creating Account...' : '🚀 Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? 
            <button onClick={onSwitchToLogin} className="link-btn">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;