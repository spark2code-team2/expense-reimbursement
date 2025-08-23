import React, { useState } from 'react';
import './pass.css';

const PasswordRecovery = ({ onGoToLogin, onGoToRoleSelection }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      setSuccess('');
      return;
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      return;
    }
    
    setError('');
    setSuccess('Password reset instructions have been sent to your email');
    
    // In a real application, you would send a recovery email to the server
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <i className="fas fa-lock"></i>
          <span>SecureLogin System</span>
        </div>
      </header>

      <div className="page">
        <div className="page-content">
          <h2>Password Recovery</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Enter your email to reset your password
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recovery-email">Email Address</label>
              <input 
                type="email" 
                id="recovery-email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}
            </div>
            
            <button type="submit" className="btn">Reset Password</button>
          </form>
          
          <div className="form-footer">
            <p>Remember your password? <button className="link-btn" onClick={onGoToLogin}>Sign in here</button></p>
            <p><button className="link-btn" onClick={onGoToRoleSelection}>← Back to role selection</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;