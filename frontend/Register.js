import React, { useState } from 'react';
import './reg.css';

const Register = ({ onRegister, onGoToLogin, onGoToRoleSelection }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee'
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    return re.test(password);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) strength += 20;
    
    setPasswordStrength(strength);
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Create user data
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    
    onRegister(userData);
  };

  const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return '#dc3545';
    if (passwordStrength < 80) return '#ffc107';
    return '#28a745';
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
          <h2>Create a New Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input 
                type="text" 
                id="register-name" 
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>
              <input 
                type="email" 
                id="register-email" 
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <div className="password-input">
                <input 
                  type="password" 
                  id="register-password" 
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="password-toggle" onClick={() => togglePasswordVisibility('register-password')}>
                  <i className="far fa-eye"></i>
                </span>
              </div>
              <div className="password-strength">
                <div 
                  className="strength-meter" 
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor: getPasswordStrengthColor()
                  }}
                ></div>
              </div>
              {errors.password && <div className="error">{errors.password}</div>}
              <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                Password must contain at least 8 characters, uppercase, lowercase, number, and special character
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <div className="password-input">
                <input 
                  type="password" 
                  id="register-confirm-password" 
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <span className="password-toggle" onClick={() => togglePasswordVisibility('register-confirm-password')}>
                  <i className="far fa-eye"></i>
                </span>
              </div>
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="register-role">Account Type</label>
              <select 
                id="register-role" 
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            <button type="submit" className="btn">Create Account</button>
          </form>
          
          <div className="form-footer">
            <p>Already have an account? <button className="link-btn" onClick={onGoToLogin}>Sign in here</button></p>
            <p><button className="link-btn" onClick={onGoToRoleSelection}>← Back to role selection</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;