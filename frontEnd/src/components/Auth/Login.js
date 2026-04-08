import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Auth.css';

const Login = ({ onLogin, onSwitchToRegister, onClose, error, loading }) => {
  const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: ''
  });
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const captchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setCaptchaError('Please complete CAPTCHA verification.');
      return;
    }

    setCaptchaError('');
    onLogin({ ...credentials, captchaToken });
    setCaptchaToken('');
    captchaRef.current?.reset();
  };

  return (
    <div className="auth-modal">
      <div className="auth-container premium-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h2>Sign In</h2>
          <p>Access your GriHom dashboard and personalized insights.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {captchaError && <div className="error-message">{captchaError}</div>}

          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="premium-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group captcha-group">
            <label>Security Check</label>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={recaptchaSiteKey}
              onChange={(token) => {
                setCaptchaToken(token || '');
                setCaptchaError('');
              }}
              onExpired={() => setCaptchaToken('')}
              onErrored={() => {
                setCaptchaToken('');
                setCaptchaError('Captcha failed to load. Please try again.');
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary full-width"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className="auth-note">Your login is protected with CAPTCHA verification.</p>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? 
            <button onClick={onSwitchToRegister} className="link-btn">
              Create one here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;