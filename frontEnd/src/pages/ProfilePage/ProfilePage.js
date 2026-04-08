import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  return (
    <section className="profile-page">
      <div className="profile-card classic-card">
        <div className="profile-header">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div>
            <h1>My Profile</h1>
            <p>Your account details in one place</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-row">
            <span className="label">Name</span>
            <span className="value">{user?.name || '-'}</span>
          </div>
          <div className="profile-detail-row">
            <span className="label">Email</span>
            <span className="value">{user?.email || '-'}</span>
          </div>
          <div className="profile-detail-row">
            <span className="label">Role</span>
            <span className="value">{user?.isAdmin ? 'Administrator' : 'User'}</span>
          </div>
          <div className="profile-detail-row">
            <span className="label">Status</span>
            <span className="value">Active</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;