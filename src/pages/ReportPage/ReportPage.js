import React, { useState, useEffect } from 'react';
import { generateRecommendations, calculateValorScore } from '../../utils/valorCalculator';
import { improvementData } from '../../data/improvementData';
import { saveUserReport, getUserReports } from '../../utils/storage';
import './ReportPage.css';

const stepLabels = ['Property basics', 'Condition', 'Planned budget', 'Contact'];

const ReportPage = ({ user }) => {
  const [propertyData, setPropertyData] = useState({
    type: 'apartment',
    location: '',
    yearBuilt: new Date().getFullYear(),
    propertyCondition: 'average',
    budget: 'Medium',
    goal: 'sell',
    propertySize: '',
    bedrooms: 2,
    fullName: '',
    email: '',
    phone: ''
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [valorScore, setValorScore] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [reportSaved, setReportSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) {
      setSavedReports(getUserReports());
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!propertyData.location.trim()) {
        setFormError('Location/City is required.');
        return false;
      }
      if (!propertyData.propertySize) {
        setFormError('Property size is required.');
        return false;
      }
    }

    if (currentStep === 4) {
      if (!propertyData.fullName.trim()) {
        setFormError('Full name is required.');
        return false;
      }
      if (!propertyData.email.trim()) {
        setFormError('Email is required.');
        return false;
      }
    }

    setFormError('');
    return true;
  };

  const handleNextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, stepLabels.length));
  };

  const handlePreviousStep = () => {
    setFormError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getNextButtonLabel = () => {
    if (currentStep === 1) return 'Next: Property Condition';
    if (currentStep === 2) return 'Next: Planned Budget';
    return 'Next: Contact Details';
  };

  const generateReport = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const recs = generateRecommendations(propertyData, improvementData);
    const score = calculateValorScore(propertyData);

    setRecommendations(recs);
    setValorScore(score);
    setShowReport(true);

    if (user) {
      const reportData = {
        propertyData,
        recommendations: recs,
        valorScore: score,
        title: `GriHom Report - ${new Date().toLocaleDateString()}`
      };

      saveUserReport(reportData);
      setSavedReports(getUserReports());
      setReportSaved(true);
      return;
    }

    setReportSaved(false);
  };

  const saveReport = () => {
    if (reportSaved) return;

    const reportData = {
      propertyData,
      recommendations,
      valorScore,
      title: `GriHom Report - ${new Date().toLocaleDateString()}`
    };
    
    saveUserReport(reportData);
    setSavedReports(getUserReports());
    setReportSaved(true);
  };

  const calculateTotalInvestment = () => {
    return recommendations.reduce((total, rec) => {
      const costMap = { Low: 30000, Medium: 100000, High: 250000 };
      return total + costMap[rec.cost];
    }, 0);
  };

  const calculateTotalValueIncrease = () => {
    return recommendations.reduce((total, rec) => total + rec.impact, 0);
  };

  return (
    <div className="report-page">
      <header className="page-header">
        <h1>Get Your Personalized GriHom Report</h1>
        <p>Discover the best improvements for your specific property</p>
      </header>

      <div className="report-layout">
        <div className="report-main">
          {!showReport ? (
            <form className="property-form classic-card" onSubmit={generateReport}>
              <div className="stepper-wrap">
                <div className="stepper-meta">
                  <h2>{stepLabels[currentStep - 1]}</h2>
                  <span>Step {currentStep} of {stepLabels.length}</span>
                </div>
                <div className="stepper-track" aria-hidden="true">
                  {stepLabels.map((label, index) => (
                    <div key={label} className={`step-dot ${currentStep >= index + 1 ? 'active' : ''}`} />
                  ))}
                </div>
              </div>

              {currentStep === 1 && (
                <div className="form-section">
                  <p className="form-help">Example: 2BHK apartment, 1100 sq ft in Vijayawada.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="type">Property Type *</label>
                      <select
                        id="type"
                        name="type"
                        value={propertyData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="independent">Independent House</option>
                        <option value="villa">Villa</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Location/City *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={propertyData.location}
                        onChange={handleInputChange}
                        placeholder="Example: Vijayawada, Benz Circle"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="propertySize">Property Size (sq. ft.) *</label>
                      <input
                        type="number"
                        id="propertySize"
                        name="propertySize"
                        value={propertyData.propertySize}
                        onChange={handleInputChange}
                        placeholder="Example: 1100"
                        min="300"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bedrooms">Bedrooms *</label>
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={propertyData.bedrooms}
                        onChange={handleInputChange}
                        required
                      >
                        <option value={1}>1 BHK</option>
                        <option value={2}>2 BHK</option>
                        <option value={3}>3 BHK</option>
                        <option value={4}>4 BHK</option>
                        <option value={5}>5+ BHK</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="yearBuilt">Year Built *</label>
                      <input
                        type="number"
                        id="yearBuilt"
                        name="yearBuilt"
                        value={propertyData.yearBuilt}
                        onChange={handleInputChange}
                        min="1950"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-section">
                  <p className="form-help">Share your current condition and primary objective.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="propertyCondition">Current Property Condition *</label>
                      <select
                        id="propertyCondition"
                        name="propertyCondition"
                        value={propertyData.propertyCondition}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="good">Good - mostly updated</option>
                        <option value="average">Average - a few upgrades needed</option>
                        <option value="needs-work">Needs work - visible renovation needed</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="goal">Primary Goal *</label>
                      <select
                        id="goal"
                        name="goal"
                        value={propertyData.goal}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="sell">Sell Property</option>
                        <option value="rent">Rent Out</option>
                        <option value="live">Live-in Upgrade</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-section">
                  <p className="form-help">Pick your planned spending range. You can always adjust later.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="budget">Planned Budget *</label>
                      <select
                        id="budget"
                        name="budget"
                        value={propertyData.budget}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Low">Low (Under ₹50,000)</option>
                        <option value="Medium">Medium (₹50,000 - ₹2,00,000)</option>
                        <option value="High">High (Over ₹2,00,000)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-section">
                  <p className="form-help">We’ll use this to share your report summary and recommendations.</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={propertyData.fullName}
                        onChange={handleInputChange}
                        placeholder="Example: Priya Reddy"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={propertyData.email}
                        onChange={handleInputChange}
                        placeholder="Example: priya@email.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={propertyData.phone}
                        onChange={handleInputChange}
                        placeholder="Example: +91 98XXXXXX12"
                      />
                    </div>
                  </div>

                  <div className="trust-text" aria-label="privacy and speed reassurance">
                    <span>✅ Takes under 3 minutes</span>
                    <span>✅ No site visit needed</span>
                    <span>✅ Your information is private</span>
                  </div>
                </div>
              )}

              {formError && <p className="form-error">{formError}</p>}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={handlePreviousStep}>
                    Back
                  </button>
                )}

                {currentStep < stepLabels.length ? (
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    {getNextButtonLabel()}
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary large">
                    Get My Free Report
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="report-results classic-card">
              <div className="report-header">
                <h2>Your GriHom Report</h2>
                {user && (
                  <button 
                    onClick={saveReport}
                    className={`btn ${reportSaved ? 'btn-success' : 'btn-secondary'}`}
                    disabled={reportSaved}
                  >
                    {reportSaved ? '✓ Saved' : '💾 Save Report'}
                  </button>
                )}
              </div>

              {/* Score Section */}
              <div className="valor-score-section">
                <h3>Current GriHom Score</h3>
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-value">{valorScore}</span>
                    <span className="score-label">/100</span>
                  </div>
                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span className="label">Property Age</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{width: '70%'}}></div>
                      </div>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Location Score</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="breakdown-item">
                      <span className="label">Modern Features</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="investment-summary">
                <h3>Investment Outlook</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-value">₹{calculateTotalInvestment().toLocaleString()}</div>
                    <div className="summary-label">Estimated Investment</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-value">+{calculateTotalValueIncrease()}%</div>
                    <div className="summary-label">Value Increase</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-value">
                      {calculateTotalValueIncrease() > 20 ? 'High' : 
                       calculateTotalValueIncrease() > 10 ? 'Medium' : 'Low'}
                    </div>
                    <div className="summary-label">ROI Potential</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="recommendations-section">
                <h3>Top 5 Recommended Improvements</h3>
                <div className="recommendations-list">
                  {recommendations.map((rec, index) => (
                    <div key={rec.id} className="recommendation-item">
                      <div className="rec-rank">#{index + 1}</div>
                      <div className="rec-content">
                        <div className="rec-header">
                          <h4>{rec.title}</h4>
                          <span className="priority-badge">
                            {index === 0 ? 'Highest Priority' : 
                             index < 2 ? 'High Priority' : 'Medium Priority'}
                          </span>
                        </div>
                        <p>{rec.description}</p>
                        <div className="rec-metrics">
                          <span className="metric-tag cost">
                            💰 {rec.cost} Cost • {rec.budgetRange}
                          </span>
                          <span className="metric-tag roi">
                            📈 {rec.roi} ROI Potential
                          </span>
                          <span className="metric-tag impact">
                            🏠 +{rec.impact}% Value Impact
                          </span>
                          <span className="metric-tag duration">
                            ⏱️ {rec.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="report-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowReport(false);
                    setCurrentStep(1);
                  }}
                >
                  ← Generate New Report
                </button>
                <button className="btn btn-primary">
                  📄 Download PDF Report
                </button>
              </div>
            </div>
          )}
        </div>

        {user && savedReports.length > 0 && (
          <div className="report-sidebar">
            <div className="saved-reports classic-card">
              <h3>Your Saved Reports</h3>
              <div className="reports-list">
                {savedReports.slice(0, 3).map(report => (
                  <div key={report.id} className="saved-report-item">
                    <h4>{report.title}</h4>
                    <p>Score: {report.valorScore}/100</p>
                    <p>{new Date(report.timestamp).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              {savedReports.length > 3 && (
                <button className="btn btn-text">
                  View All Reports ({savedReports.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;