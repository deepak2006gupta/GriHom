import React, { useEffect, useState } from 'react';
import { getAdminImprovements, saveAdminImprovement, saveAdminImprovementHistoryEntry } from '../../utils/storage';
import './AdminImprovementsPage.css';

const AdminImprovementsPage = ({ currentUser }) => {
  const [improvements, setImprovements] = useState([]);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    room: 'All',
    cost: 'Low',
    effort: 'Medium',
    roi: 'High',
    impact: 0
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
      impact: 0
    });
  };

  const handleAddSuggestion = (e) => {
    e.preventDefault();

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
          onClick={() => setShowSuggestionForm((prev) => !prev)}
        >
          {showSuggestionForm ? 'Close Form' : 'Add New Suggestion'}
        </button>

        {showSuggestionForm && (
          <form className="suggestion-form" onSubmit={handleAddSuggestion}>
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

            <button type="submit" className="btn btn-primary">Save Suggestion</button>
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
                <h3>{imp.title}</h3>
                <p>{imp.description}</p>
                <div className="improvement-meta">
                  <span className="meta-tag room">{imp.room}</span>
                  <span className="meta-tag cost">{imp.cost} Cost</span>
                  <span className="meta-tag roi">{imp.roi} ROI</span>
                  <span className="meta-tag impact">+{imp.impact}% Value</span>
                  <span className="meta-tag">{new Date(imp.createdAt || imp.timestamp || Date.now()).toLocaleString()}</span>
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