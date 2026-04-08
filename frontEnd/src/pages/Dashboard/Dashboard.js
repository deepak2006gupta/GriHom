import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserReport, getUserReports, getPlannedImprovements, savePlannedImprovements } from '../../utils/storage';
import apiService from '../../services/api';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [savedReports, setSavedReports] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [plannedImprovementIds, setPlannedImprovementIds] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    if (user) {
      setSavedReports(getUserReports());
      const planned = getPlannedImprovements();
      setPlannedImprovementIds(planned);
    }
  }, [user]);

  useEffect(() => {
    const loadImprovements = async () => {
      try {
        const data = await apiService.getImprovements();
        setImprovements(data);
      } catch (error) {
        console.error('Error loading improvements:', error);
      }
    };
    loadImprovements();
  }, []);

  const calculateAverageScore = () => {
    if (savedReports.length === 0) return 0;
    const total = savedReports.reduce((sum, report) => sum + report.valorScore, 0);
    return Math.round(total / savedReports.length);
  };

  const handleDeleteReport = (report) => {
    const shouldDelete = window.confirm(`Delete report "${report.title}"?`);
    if (!shouldDelete) return;

    const updatedReports = deleteUserReport(report.id);
    setSavedReports(updatedReports);
  };

  const handleRemovePlannedImprovement = (improvementId) => {
    const updated = plannedImprovementIds.filter(id => id !== improvementId);
    setPlannedImprovementIds(updated);
    savePlannedImprovements(updated);
  };

  const getPlannedImprovementDetails = () => {
    return plannedImprovementIds
      .map(id => improvements.find(imp => imp.id === id))
      .filter(imp => imp !== undefined);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Track your home improvement journey</p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card classic-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{savedReports.length}</div>
            <div className="stat-label">Total Reports</div>
          </div>
        </div>
        
        <div className="stat-card classic-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-number">{calculateAverageScore()}</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
        
        <div className="stat-card classic-card">
          <div className="stat-icon">💡</div>
          <div className="stat-content">
            <div className="stat-number">
              {savedReports.reduce((total, report) => total + report.recommendations.length, 0)}
            </div>
            <div className="stat-label">Improvement Ideas</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-main">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'planned' ? 'active' : ''}`}
              onClick={() => setActiveTab('planned')}
            >
              Planned Improvements ({plannedImprovementIds.length})
            </button>
            {savedReports.length > 0 && (
              <button 
                className={`tab-btn ${activeTab === 'view-report' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('view-report');
                  if (!selectedReport && savedReports.length > 0) {
                    setSelectedReport(savedReports[0]);
                  }
                }}
              >
                📋 View Report
              </button>
            )}
            <button 
              className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              All Reports
            </button>
            <button 
              className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-grid">
                <div className="recent-reports classic-card">
                  <h3>Recent Reports</h3>
                  {savedReports.slice(0, 3).map(report => (
                    <div key={report.id} className="report-preview">
                      <div className="report-info">
                        <h4>{report.title}</h4>
                        <p>Generated on {new Date(report.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="report-score">
                        <div className="score-badge">{report.valorScore}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quick-actions classic-card">
                  <h3>Quick Actions</h3>
                  <button className="action-btn">
                    🏠 Generate New Report
                  </button>
                  <button className="action-btn">
                    💡 Browse Ideas
                  </button>
                  <button className="action-btn">
                    📊 Compare Reports
                  </button>
                  {user?.isAdmin && (
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => navigate('/admin/suggestions')}
                    >
                      🛠️ Suggestions
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'planned' && (
              <div className="planned-improvements classic-card">
                <h3>Your Planned Improvements</h3>
                {plannedImprovementIds.length === 0 ? (
                  <div className="empty-state">
                    <p>No improvements planned yet.</p>
                    <p>Visit the Ideas page to start building your improvement plan.</p>
                  </div>
                ) : (
                  <div className="planned-grid">
                    {getPlannedImprovementDetails().map(improvement => (
                      <div key={improvement.id} className="planned-card classic-card">
                        {(improvement.imageUrl || improvement.image) && (
                          <img
                            src={improvement.imageUrl || improvement.image}
                            alt={improvement.title}
                            className="planned-card-image"
                          />
                        )}
                        <div className="planned-card-content">
                          <h4>{improvement.title}</h4>
                          <p className="planned-description">{improvement.description}</p>
                          <div className="planned-metrics">
                            <span className="metric">💰 {improvement.budgetRange || improvement.cost}</span>
                            <span className="metric">📈 +{improvement.impact}% value</span>
                            <span className="metric">🏠 {improvement.room}</span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-delete-light"
                            onClick={() => handleRemovePlannedImprovement(improvement.id)}
                          >
                            Remove from Plan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
9
            {activeTab === 'view-report' && selectedReport && (
              <div className="report-details classic-card">
                <button 
                  type="button"
                  className="btn-close-report"
                  onClick={() => {
                    setActiveTab('reports');
                    setSelectedReport(null);
                  }}
                  aria-label="Back to reports"
                >
                  ← Back
                </button>
                <h2>{selectedReport.title}</h2>
                <div className="report-header-meta">
                  <span>📍 {selectedReport.propertyData.location}</span>
                  <span>🏠 {selectedReport.propertyData.type}</span>
                  <span>📅 {new Date(selectedReport.timestamp).toLocaleDateString()}</span>
                </div>
                
                <div className="report-score-section">
                  <div className="score-display">
                    <div className="score-circle">{selectedReport.valorScore}</div>
                    <div className="score-label">Valor Score</div>
                  </div>
                  <div className="score-description">
                    <p><strong>Property Assessment:</strong> {selectedReport.propertyData.bedrooms}BHK • {selectedReport.propertyData.condition}</p>
                    <p><strong>Market Value Range:</strong> ₹{selectedReport.propertyData.estimatedValue}</p>
                  </div>
                </div>

                <div className="report-section">
                  <h3>🎯 Key Recommendations</h3>
                  <div className="recommendations-grid">
                    {selectedReport.recommendations.slice(0, 6).map((rec, idx) => (
                      <div key={idx} className="recommendation-card">
                        <div className="rec-icon">💡</div>
                        <h4>{rec.title}</h4>
                        <p>{rec.description}</p>
                        <div className="rec-details">
                          <span className="impact">+{rec.valueLift}% impact</span>
                          <span className="priority">{rec.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedReport.recommendations.length > 6 && (
                    <p className="show-more">... and {selectedReport.recommendations.length - 6} more recommendations</p>
                  )}
                </div>

                <div className="report-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/ideas')}
                  >
                    💡 Explore More Ideas
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleDeleteReport(selectedReport)}
                  >
                    Delete Report
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="reports-list classic-card">
                <h3>All Your Reports</h3>
                {savedReports.map(report => (
                  <div key={report.id} className="report-item">
                    <div className="report-item-main">
                      <h4>{report.title}</h4>
                      <p>{report.propertyData.location} • {report.propertyData.type}</p>
                      <div className="report-meta">
                        <span>Score: {report.valorScore}/100</span>
                        <span>•</span>
                        <span>{report.recommendations.length} recommendations</span>
                        <span>•</span>
                        <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="dashboard-report-actions">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => {
                          setSelectedReport(report);
                          setActiveTab('view-report');
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-delete-light"
                        onClick={() => handleDeleteReport(report)}
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
    </div>
  );
};

export default Dashboard;