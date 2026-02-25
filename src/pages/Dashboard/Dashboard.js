import React, { useState, useEffect } from 'react';
import { getUserReports } from '../../utils/storage';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [savedReports, setSavedReports] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      setSavedReports(getUserReports());
    }
  }, [user]);

  const calculateAverageScore = () => {
    if (savedReports.length === 0) return 0;
    const total = savedReports.reduce((sum, report) => sum + report.valorScore, 0);
    return Math.round(total / savedReports.length);
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
                      <button className="btn btn-secondary">View</button>
                      <button className="btn btn-text">Delete</button>
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