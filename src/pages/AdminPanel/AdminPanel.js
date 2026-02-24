import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';
import './AdminPanel.css';

const AdminPanel = ({ currentUser }) => {
  const [improvements, setImprovements] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [newImprovement, setNewImprovement] = useState({
    title: '',
    description: '',
    cost: 'Low',
    effort: 'Medium',
    roi: 'High',
    impact: 0,
    room: 'All'
  });

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
  }, []);

  const handleAddImprovement = (e) => {
    e.preventDefault();
    setImprovements([...improvements, { ...newImprovement, id: Date.now() }]);
    setNewImprovement({
      title: '',
      description: '',
      cost: 'Low',
      effort: 'Medium',
      roi: 'High',
      impact: 0,
      room: 'All'
    });
  };

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
        <h1>Admin Dashboard</h1>
        <p>Manage property improvement recommendations</p>
      </div>

      <div className="admin-content">
        <div className="admin-section classic-card">
          <h2>Add New Improvement</h2>
          <form onSubmit={handleAddImprovement} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newImprovement.title}
                  onChange={(e) => setNewImprovement({...newImprovement, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room Type</label>
                <select
                  value={newImprovement.room}
                  onChange={(e) => setNewImprovement({...newImprovement, room: e.target.value})}
                >
                  <option value="All">All</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Exterior">Exterior</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newImprovement.description}
                onChange={(e) => setNewImprovement({...newImprovement, description: e.target.value})}
                required
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cost</label>
                <select
                  value={newImprovement.cost}
                  onChange={(e) => setNewImprovement({...newImprovement, cost: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effort</label>
                <select
                  value={newImprovement.effort}
                  onChange={(e) => setNewImprovement({...newImprovement, effort: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>ROI Potential</label>
                <select
                  value={newImprovement.roi}
                  onChange={(e) => setNewImprovement({...newImprovement, roi: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Value Impact (%)</label>
                <input
                  type="number"
                  value={newImprovement.impact}
                  onChange={(e) => setNewImprovement({...newImprovement, impact: parseInt(e.target.value)})}
                  min="0"
                  max="50"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Add Improvement</button>
          </form>
        </div>

        <div className="admin-section classic-card">
          <h2>Current Improvements ({improvements.length})</h2>
          <div className="improvements-list">
            {improvements.map(imp => (
              <div key={imp.id} className="improvement-item">
                <h3>{imp.title}</h3>
                <p>{imp.description}</p>
                <div className="improvement-meta">
                  <span className="meta-tag room">{imp.room}</span>
                  <span className="meta-tag cost">{imp.cost} Cost</span>
                  <span className="meta-tag roi">{imp.roi} ROI</span>
                  <span className="meta-tag impact">+{imp.impact}% Value</span>
                </div>
              </div>
            ))}
          </div>
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