import React, { useState } from 'react';
import './role.css';

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <span>Role Selection</span>
        </div>
      </header>

      <div className="page">
        <div className="page-content">
          <h2>Select Your Role</h2>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            Choose your role to continue to the login page
          </p>
          
          <div className="role-options">
            <div 
              className={`role-option ${selectedRole === 'employee' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('employee')}
            >
              <div className="role-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Employee</h3>
            </div>
            
            <div 
              className={`role-option ${selectedRole === 'manager' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('manager')}
            >
              <div className="role-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Manager</h3>
            
            </div>
            
            <div 
              className={`role-option ${selectedRole === 'admin' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('admin')}
            >
              <div className="role-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Administrator</h3>
            </div>
          </div>
          
          <button 
            className="btn" 
            disabled={!selectedRole} 
            onClick={handleContinue}
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;