import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  deleteAdminImprovement,
  getAdminImprovements,
  saveAdminImprovement,
  saveAdminImprovementHistoryEntry,
  updateAdminImprovement
} from '../../utils/storage';
import './AdminImprovementsPage.css';

const AdminImprovementsPage = ({ currentUser }) => {
  const location = useLocation();
  const [improvements, setImprovements] = useState([]);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [editingSuggestionId, setEditingSuggestionId] = useState(null);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    room: 'All',
    cost: 'Low',
    effort: 'Medium',
    roi: 'High',
    impact: 0,
    imageUrl: ''
  });

  useEffect(() => {
    setImprovements(getAdminImprovements());
  }, []);

  const resetSuggestionForm = () => {
    setNewSuggestion({
      title: '',
      description: '',
      room: 'All',
      cost: 'Low',
      effort: 'Medium',
      roi: 'High',
      impact: 0,
      imageUrl: ''
    });
  };

  const startEditingSuggestion = (suggestion) => {
    setEditingSuggestionId(suggestion.id);
    setNewSuggestion({
      title: suggestion.title || '',
      description: suggestion.description || '',
      room: suggestion.room || 'All',
      cost: suggestion.cost || 'Low',
      effort: suggestion.effort || 'Medium',
      roi: suggestion.roi || 'High',
      impact: suggestion.impact || 0,
      imageUrl: suggestion.imageUrl || ''
    });
    setShowSuggestionForm(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const shouldOpenNewForm = queryParams.get('new') === '1';
    if (shouldOpenNewForm) {
      setEditingSuggestionId(null);
      resetSuggestionForm();
      setShowSuggestionForm(true);
      return;
    }

    const editParam = queryParams.get('edit');
    if (!editParam) return;

    const suggestionId = Number(editParam);
    if (!Number.isFinite(suggestionId)) return;

    const suggestionToEdit = improvements.find((item) => item.id === suggestionId);
    if (!suggestionToEdit) return;

    startEditingSuggestion(suggestionToEdit);
  }, [location.search, improvements]);

  const cancelEditing = () => {
    setEditingSuggestionId(null);
    resetSuggestionForm();
    setShowSuggestionForm(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setNewSuggestion((prev) => ({ ...prev, imageUrl: '' }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewSuggestion((prev) => ({
        ...prev,
        imageUrl: typeof reader.result === 'string' ? reader.result : ''
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSuggestion = (e) => {
    e.preventDefault();

    if (editingSuggestionId) {
      const updatedSuggestion = updateAdminImprovement(editingSuggestionId, {
        ...newSuggestion,
        updatedBy: currentUser?.name || 'Admin'
      });

      if (!updatedSuggestion) return;

      saveAdminImprovementHistoryEntry({
        action: 'Edited suggestion',
        details: `${updatedSuggestion.title} (${updatedSuggestion.room})`,
        adminName: currentUser?.name || 'Admin',
        adminEmail: currentUser?.email || ''
      });

      setImprovements((prev) =>
        prev.map((item) => (item.id === editingSuggestionId ? updatedSuggestion : item))
      );
      cancelEditing();
      return;
    }

    const savedSuggestion = saveAdminImprovement({
      ...newSuggestion,
      createdBy: currentUser?.name || 'Admin'
    });

    saveAdminImprovementHistoryEntry({
      action: 'Added suggestion',
      details: `${savedSuggestion.title} (${savedSuggestion.room})`,
      adminName: currentUser?.name || 'Admin',
      adminEmail: currentUser?.email || ''
    });

    setImprovements((prev) => [savedSuggestion, ...prev]);
    resetSuggestionForm();
    setShowSuggestionForm(false);
  };

  const handleDeleteSuggestion = (suggestion) => {
    const shouldDelete = window.confirm(`Delete suggestion "${suggestion.title}"?`);
    if (!shouldDelete) return;

    const deletedSuggestion = deleteAdminImprovement(suggestion.id);
    if (!deletedSuggestion) return;

    saveAdminImprovementHistoryEntry({
      action: 'Deleted suggestion',
      details: `${deletedSuggestion.title} (${deletedSuggestion.room})`,
      adminName: currentUser?.name || 'Admin',
      adminEmail: currentUser?.email || ''
    });

    setImprovements((prev) => prev.filter((item) => item.id !== suggestion.id));

    if (editingSuggestionId === suggestion.id) {
      cancelEditing();
    }
  };

  const handleToggleSuggestionForm = () => {
    if (showSuggestionForm) {
      cancelEditing();
      return;
    }

    setEditingSuggestionId(null);
    resetSuggestionForm();
    setShowSuggestionForm(true);
  };

  return (
    <div className="admin-improvements-page">
      <div className="admin-improvements-header">
        <h1>Suggestions</h1>
        <p>View suggestion logs and add new suggestions.</p>
      </div>

      <div className="suggestion-actions classic-card">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleToggleSuggestionForm}
        >
          {showSuggestionForm ? 'Close Form' : 'Add New Suggestion'}
        </button>

        {showSuggestionForm && (
          <form className="suggestion-form" onSubmit={handleSaveSuggestion}>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newSuggestion.title}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room Type</label>
                <select
                  value={newSuggestion.room}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, room: e.target.value })}
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
                value={newSuggestion.description}
                onChange={(e) => setNewSuggestion({ ...newSuggestion, description: e.target.value })}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {newSuggestion.imageUrl && (
                <div className="suggestion-image-preview-wrapper">
                  <img
                    src={newSuggestion.imageUrl}
                    alt="Suggestion preview"
                    className="suggestion-image-preview"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setNewSuggestion((prev) => ({ ...prev, imageUrl: '' }))}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cost</label>
                <select
                  value={newSuggestion.cost}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, cost: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effort</label>
                <select
                  value={newSuggestion.effort}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, effort: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>ROI Potential</label>
                <select
                  value={newSuggestion.roi}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, roi: e.target.value })}
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
                  min="0"
                  max="50"
                  value={newSuggestion.impact}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, impact: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div className="suggestion-form-actions">
              <button type="submit" className="btn btn-primary">
                {editingSuggestionId ? 'Update Suggestion' : 'Save Suggestion'}
              </button>
              {editingSuggestionId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEditing}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="admin-improvements-list classic-card">
        <h2>Suggestion Log ({improvements.length})</h2>

        {improvements.length === 0 ? (
          <p className="empty-state">No suggestions added yet.</p>
        ) : (
          <div className="improvements-list">
            {improvements.map((imp) => (
              <div key={imp.id} className="improvement-item">
                {imp.imageUrl && (
                  <img
                    src={imp.imageUrl}
                    alt={imp.title}
                    className="improvement-item-image"
                  />
                )}
                <h3>{imp.title}</h3>
                <p>{imp.description}</p>
                <div className="improvement-meta">
                  <span className="meta-tag room">{imp.room}</span>
                  <span className="meta-tag cost">{imp.cost} Cost</span>
                  <span className="meta-tag roi">{imp.roi} ROI</span>
                  <span className="meta-tag impact">+{imp.impact}% Value</span>
                  <span className="meta-tag">{new Date(imp.updatedAt || imp.createdAt || imp.timestamp || Date.now()).toLocaleString()}</span>
                </div>
                <div className="improvement-actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => startEditingSuggestion(imp)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-delete-light btn-sm"
                    onClick={() => handleDeleteSuggestion(imp)}
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
  );
};

export default AdminImprovementsPage;