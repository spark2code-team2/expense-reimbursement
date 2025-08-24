import React, { useState } from 'react';
import './login.css';
const Login = ({ selectedRole, onLogin, onGoToRegister, onGoToPasswordRecovery, onGoToRoleSelection }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    
    // In a real app, you would verify credentials with a server
    const userData = {
      name: 'Demo User',
      email: email,
      role: selectedRole,
      joinDate: 'April 2023'
    };
    
    onLogin(userData);
  };

  const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <i className="fas fa-lock"></i>
          <span>Sign in </span>
        </div>
      </header>

      <div className="page">
        <div className="page-content">
          <h2>Login to Your Account</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#4cb0af', fontWeight: '600' }}>
            Logging in as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </p>
          
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="password-input">
              <input 
                type="password" 
                id="login-password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle" onClick={() => togglePasswordVisibility('login-password')}>
                <i className="far fa-eye"></i>
              </span>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          <button className="btn" onClick={handleLogin}>Sign In</button>
          
          <div className="form-footer">
            <p>Don't have an account? <button className="link-btn" onClick={onGoToRegister}>Register here</button></p>
            <p><button className="link-btn" onClick={onGoToPasswordRecovery}>Forgot your password?</button></p>
            <p><button className="link-btn" onClick={onGoToRoleSelection}>← Back to role selection</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;