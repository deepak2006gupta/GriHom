import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';
import { getAdminImprovementHistory, saveAdminImprovementHistoryEntry } from '../../utils/storage';
import './AdminPanel.css';

const AdminPanel = ({ currentUser }) => {
  const [improvementHistory, setImprovementHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    setImprovementHistory(getAdminImprovementHistory());

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

      const historyEntry = saveAdminImprovementHistoryEntry({
        action: 'Updated user role',
        details: `${updatedUser.name} set to ${updatedUser.isAdmin ? 'Admin' : 'Homeowner'}`,
        adminName: currentUser?.name || 'Admin',
        adminEmail: currentUser?.email || ''
      });
      setImprovementHistory((prev) => [historyEntry, ...prev]);
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

      const historyEntry = saveAdminImprovementHistoryEntry({
        action: 'Updated user status',
        details: `${updatedUser.name} account ${updatedUser.isActive ? 'activated' : 'deactivated'}`,
        adminName: currentUser?.name || 'Admin',
        adminEmail: currentUser?.email || ''
      });
      setImprovementHistory((prev) => [historyEntry, ...prev]);
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

      const historyEntry = saveAdminImprovementHistoryEntry({
        action: 'Deleted user',
        details: `${user.name} (${user.email}) removed`,
        adminName: currentUser?.name || 'Admin',
        adminEmail: currentUser?.email || ''
      });
      setImprovementHistory((prev) => [historyEntry, ...prev]);
    } catch (error) {
      setUsersError(error.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users and review admin change history</p>
      </div>

      <div className="admin-content">
        <div className="admin-section classic-card">
          <h2>History of Changes Made</h2>
          {improvementHistory.length === 0 ? (
            <p className="empty-history">No admin changes recorded yet.</p>
          ) : (
            <div className="history-list">
              {improvementHistory.map((entry) => (
                <div key={entry.id} className="history-item">
                  <div className="history-item-main">
                    <h3>{entry.action}</h3>
                    <p>{entry.details || entry.improvementTitle || 'Change updated'}</p>
                    <div className="history-meta">
                      <span className="meta-tag">By {entry.adminName}</span>
                      <span className="meta-tag">{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
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
                      className="btn btn-text danger-action"
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