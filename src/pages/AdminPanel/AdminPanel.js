import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';
import {
  getAdminImprovementHistory
} from '../../utils/storage';
import './AdminPanel.css';

const AdminPanel = ({ currentUser }) => {
  const [suggestionLogs, setSuggestionLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        setUsersError('');
        const data = await apiService.getAdminUsers();
        setUsers(data);
      } catch (error) {
        setUsersError(error.message || 'Failed to load users.');
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
    setSuggestionLogs(getAdminImprovementHistory());
  }, []);

  const updateUserInState = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleRoleToggle = async (user) => {
    if (user.id === currentUser?.id) {
      setUsersError('You cannot change your own admin role while signed in.');
      return;
    }

    try {
      setUsersError('');
      const updatedUser = await apiService.updateUserRole(user.id, !user.isAdmin);
      updateUserInState(updatedUser);
      setActionMessage(`${updatedUser.name} is now ${updatedUser.isAdmin ? 'an admin' : 'a homeowner'}.`);
    } catch (error) {
      setUsersError(error.message || 'Failed to update user role.');
    }
  };

  const handleStatusToggle = async (user) => {
    if (user.id === currentUser?.id) {
      setUsersError('You cannot deactivate your own account.');
      return;
    }

    try {
      setUsersError('');
      const updatedUser = await apiService.updateUserStatus(user.id, !user.isActive);
      updateUserInState(updatedUser);
      setActionMessage(`${updatedUser.name} account is now ${updatedUser.isActive ? 'active' : 'inactive'}.`);
    } catch (error) {
      setUsersError(error.message || 'Failed to update account status.');
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.id === currentUser?.id) {
      setUsersError('You cannot delete your own account.');
      return;
    }

    const confirmed = window.confirm(`Delete ${user.name} (${user.email})?`);
    if (!confirmed) return;

    try {
      setUsersError('');
      const updatedUsers = await apiService.deleteUser(user.id);
      setUsers(updatedUsers);
      setActionMessage(`${user.name} was removed from the platform.`);
    } catch (error) {
      setUsersError(error.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage users and suggestion logs.</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-section classic-card">
          <div className="users-header">
            <h2>Suggestions Log ({suggestionLogs.length})</h2>
            <p>Recent suggestion actions performed by admins.</p>
          </div>

          {suggestionLogs.length === 0 ? (
            <p className="empty-state">No suggestion logs available yet.</p>
          ) : (
            <div className="improvements-list">
              {suggestionLogs.slice(0, 10).map((logEntry) => (
                <div key={logEntry.id} className="improvement-item">
                  <h3>{logEntry.action}</h3>
                  <p>{logEntry.details}</p>
                  <div className="improvement-meta">
                    <span className="meta-tag room">{logEntry.adminName || 'Admin'}</span>
                    <span className="meta-tag roi">{new Date(logEntry.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="admin-section classic-card">
          <div className="users-header">
            <h2>User Management ({users.length})</h2>
            <p>Manage user access, role permissions, and account status.</p>
          </div>

          {usersError && <div className="admin-alert error">{usersError}</div>}
          {actionMessage && <div className="admin-alert success">{actionMessage}</div>}

          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <div className="users-list">
              {users.map((managedUser) => (
                <div key={managedUser.id} className="user-item">
                  <div className="user-main">
                    <h3>{managedUser.name}</h3>
                    <p>{managedUser.email}</p>
                    <div className="user-meta">
                      <span className={`meta-tag ${managedUser.isAdmin ? 'role-admin' : 'role-user'}`}>
                        {managedUser.isAdmin ? 'Admin' : 'Homeowner'}
                      </span>
                      <span className={`meta-tag ${managedUser.isActive ? 'status-active' : 'status-inactive'}`}>
                        {managedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {managedUser.id === currentUser?.id && (
                        <span className="meta-tag current-user">Current User</span>
                      )}
                    </div>
                  </div>

                  <div className="user-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleRoleToggle(managedUser)}
                      disabled={managedUser.id === currentUser?.id}
                    >
                      {managedUser.isAdmin ? 'Set Homeowner' : 'Set Admin'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleStatusToggle(managedUser)}
                      disabled={managedUser.id === currentUser?.id}
                    >
                      {managedUser.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete-light"
                      onClick={() => handleDeleteUser(managedUser)}
                      disabled={managedUser.id === currentUser?.id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;