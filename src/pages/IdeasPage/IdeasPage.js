import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/api';
import './IdeasPage.css';

const FAVORITE_KEY = 'GriHom_favoriteIdeas';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('impact-desc');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]');
    } catch {
      return [];
    }
  });

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
  }, [loadImprovements]);

  useEffect(() => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (ideaId) => {
    setFavoriteIds((prev) => {
      if (prev.includes(ideaId)) {
        return prev.filter((id) => id !== ideaId);
      }
      return [...prev, ideaId];
    });
  };

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

  const filteredIdeas = improvements
    .filter(filterByChip)
    .filter((idea) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        idea.title.toLowerCase().includes(term)
        || idea.description.toLowerCase().includes(term)
        || idea.room.toLowerCase().includes(term)
      );
    })
    .filter((idea) => (favoritesOnly ? favoriteIds.includes(idea.id) : true))
    .sort((a, b) => {
      if (sortBy === 'impact-desc') return b.impact - a.impact;
      if (sortBy === 'impact-asc') return a.impact - b.impact;
      if (sortBy === 'budget-low-high') return a.budgetRange.localeCompare(b.budgetRange);
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="ideas-page">
      <header className="ideas-header">
        <h1>Home Improvement Ideas</h1>
        <p>Browse ideas by budget, room type, and impact to plan faster.</p>
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

      <div className="ideas-toolbar classic-card">
        <div className="toolbar-group">
          <label htmlFor="idea-search">Search ideas</label>
          <input
            id="idea-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by room, title, or keyword"
          />
        </div>

        <div className="toolbar-group">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="impact-desc">Impact: High to Low</option>
            <option value="impact-asc">Impact: Low to High</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="budget-low-high">Budget Range</option>
          </select>
        </div>

        <button
          type="button"
          className={`idea-chip favorite-toggle ${favoritesOnly ? 'active' : ''}`}
          onClick={() => setFavoritesOnly((prev) => !prev)}
          aria-pressed={favoritesOnly}
        >
          {favoritesOnly ? '⭐ Showing Favorites' : '☆ Favorites only'}
        </button>
      </div>

      <div className="ideas-count">
        {loading ? 'Loading...' : `Showing ${filteredIdeas.length} ideas for ${activeChip}`}
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
              {sectionIdeas.map((improvement) => (
                <article key={improvement.id} className="idea-card classic-card">
                  <div className="idea-card-header">
                    <div className="idea-icon" aria-hidden="true">
                      {roomIcons[improvement.room] || '🏡'}
                    </div>
                    <span className="room-tag">{improvement.room}</span>
                  </div>

                  <button
                    type="button"
                    className={`favorite-btn ${favoriteIds.includes(improvement.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(improvement.id)}
                  >
                    {favoriteIds.includes(improvement.id) ? '⭐ Saved' : '☆ Save'}
                  </button>

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

                  <Link to="/report" className="btn btn-primary idea-cta">
                    Add to my improvement plan
                  </Link>
                </article>
              ))}
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