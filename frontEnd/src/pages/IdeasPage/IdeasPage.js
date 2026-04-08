import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api';
import { getPlannedImprovements, savePlannedImprovements } from '../../utils/storage';
import './IdeasPage.css';

const budgetSections = [
  { key: 'Low', title: 'Low Budget (₹10k–₹50k)', subtitle: 'Quick and affordable upgrades with strong value impact.' },
  { key: 'Medium', title: 'Medium Budget (₹50k–₹2L)', subtitle: 'Balanced improvements for better resale perception.' },
  { key: 'High', title: 'High Budget (₹2L+)', subtitle: 'Premium upgrades for major value enhancement.' }
];

const filterChips = ['All', 'Kitchen', 'Bathroom', 'Curb Appeal', 'Quick Wins'];

const roomIcons = {
  Kitchen: '🍽️',
  Bathroom: '🛁',
  'Living Room': '🛋️',
  Bedroom: '🛏️',
  Exterior: '🏡',
  All: '🧰'
};

const IdeasPage = () => {
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChip, setActiveChip] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [plannedImprovementIds, setPlannedImprovementIds] = useState([]);

  const loadImprovements = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getImprovements();
      setImprovements(data);
    } catch (error) {
      console.error('Error loading improvements:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImprovements();
    // Load planned improvements from localStorage
    const savedPlanned = getPlannedImprovements();
    setPlannedImprovementIds(savedPlanned);
  }, [loadImprovements]);

  const filterByChip = (idea) => {
    if (activeChip === 'All') return true;
    if (activeChip === 'Kitchen') return idea.room === 'Kitchen';
    if (activeChip === 'Bathroom') return idea.room === 'Bathroom';
    if (activeChip === 'Curb Appeal') return idea.room === 'Exterior';
    if (activeChip === 'Quick Wins') {
      const quickTags = ['quick', 'quick-win'];
      return idea.cost === 'Low' || idea.tags?.some((tag) => quickTags.includes(tag));
    }
    return true;
  };

  const filteredIdeas = improvements.filter((idea) => {
    const matchesChip = filterByChip(idea);
    const query = searchQuery.trim().toLowerCase();

    if (!query) return matchesChip;

    const searchableText = `${idea.title} ${idea.description} ${idea.room}`.toLowerCase();
    return matchesChip && searchableText.includes(query);
  });

  const adminSuggestionsCount = filteredIdeas.filter((idea) => idea.source === 'admin').length;

  const handleAddToPlan = (improvementId) => {
    setPlannedImprovementIds((prev) => {
      const updated = prev.includes(improvementId) ? prev : [...prev, improvementId];
      savePlannedImprovements(updated);
      return updated;
    });
  };

  return (
    <div className="ideas-page">
      <header className="ideas-header">
        <h1>Home Improvement Ideas</h1>
        <p>Browse ideas by budget, room type, and impact to plan faster.</p>
        <div className="ideas-search-wrap">
          <input
            type="text"
            className="ideas-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ideas by title, room, or keyword"
            aria-label="Search improvement ideas"
          />
        </div>
      </header>

      <div className="ideas-chip-row" role="tablist" aria-label="Idea category filters">
        {filterChips.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`idea-chip ${activeChip === chip ? 'active' : ''}`}
            onClick={() => setActiveChip(chip)}
            aria-pressed={activeChip === chip}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="ideas-count">
        {loading
          ? 'Loading...'
          : `Showing ${filteredIdeas.length} ideas for ${activeChip}${adminSuggestionsCount ? ` • ${adminSuggestionsCount} admin suggestions` : ''}`}
      </div>

      {budgetSections.map((section) => {
        const sectionIdeas = filteredIdeas.filter((idea) => idea.cost === section.key);

        return (
          <section key={section.key} className="budget-section">
            <div className="budget-section-header">
              <div>
                <h2>{section.title}</h2>
                <p>{section.subtitle}</p>
              </div>
              <Link to="/report" className="btn btn-secondary budget-report-btn">
                See impact in my report
              </Link>
            </div>

            <div className="ideas-grid">
              {sectionIdeas.length === 0 ? (
                <div className="ideas-section-empty classic-card">
                  <p>No ideas found in this budget for current filters.</p>
                </div>
              ) : (
                sectionIdeas.map((improvement) => (
                  <article key={improvement.id} className="idea-card classic-card">
                    {(improvement.imageUrl || improvement.image) && (
                      <img
                        src={improvement.imageUrl || improvement.image}
                        alt={improvement.title}
                        className="idea-card-image"
                      />
                    )}
                    <div className="idea-card-header">
                      <div className="idea-icon" aria-hidden="true">
                        {roomIcons[improvement.room] || '🏡'}
                      </div>
                      <div className="idea-card-tags">
                        <span className="room-tag">{improvement.room}</span>
                        {improvement.source === 'admin' && (
                          <span className="source-tag">Admin Suggestion</span>
                        )}
                      </div>
                    </div>

                    <h3>{improvement.title}</h3>
                    <p className="idea-description">{improvement.description}</p>

                    <div className="idea-metrics">
                      <div className="metric-item">
                        <span>Budget</span>
                        <strong>{improvement.budgetRange}</strong>
                      </div>
                      <div className="metric-item">
                        <span>Potential Impact</span>
                        <strong>+{improvement.impact}% value</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`btn ${plannedImprovementIds.includes(improvement.id) ? 'btn-secondary' : 'btn-primary'} idea-cta`}
                      onClick={() => handleAddToPlan(improvement.id)}
                    >
                      {plannedImprovementIds.includes(improvement.id) ? 'Added to plan' : 'Add to my improvement plan'}
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>
        );
      })}

      {filteredIdeas.length === 0 && (
        <div className="no-results classic-card">
          <h3>No improvements found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};

export default IdeasPage;