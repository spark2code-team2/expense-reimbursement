import React from 'react';
import './pro.css';

const Profile = ({ userData, onGoToLogin, onGoToRoleSelection }) => {
  if (!userData) {
    return (
      <div className="container">
        <div className="page">
          <div className="page-content">
            <h2>No User Data</h2>
            <p>Please log in to view your profile.</p>
            <button className="btn" onClick={onGoToLogin}>Go to Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page">
        <div className="profile-header">
          <div className="avatar">
            <i className="fas fa-user"></i>
          </div>
          <h2>{userData.name}</h2>
          <p>{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
        </div>
        
        <div className="page-content">
          <div className="profile-info">
            <div className="info-group">
              <div className="info-label">Email Address</div>
              <div className="info-value">{userData.email}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Account Type</div>
              <div className="info-value">{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</div>
            </div>
            
            <div className="info-group">
              <div className="info-label">Member Since</div>
              <div className="info-value">{userData.joinDate}</div>
            </div>
          </div>
          
          <button className="btn secondary-btn" onClick={onGoToLogin}>Sign Out</button>
          <div className="form-footer">
            <p><button className="link-btn" onClick={onGoToRoleSelection}>← Back to role selection</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;