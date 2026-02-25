import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveReview } from '../../utils/storage';
import './HomePage.css';
import homeHeroIllustration from '../../assets/home-hero.svg';

const HomePage = () => {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    reviewText: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const stats = [
    { icon: '📈', number: '15–25%', label: 'Average value increase' },
    { icon: '🏠', number: '50,000+', label: 'Homeowners guided' },
    { icon: '💰', number: '₹5L–₹20L', label: 'Typical value added' },
    { icon: '⭐', number: '95%', label: 'User satisfaction rate' }
  ];

  const testimonials = [
    {
      quote: 'The report helped us prioritize kitchen and lighting upgrades. We got better offers within 2 weeks.',
      person: 'Anusha R.',
      location: 'Vijayawada'
    },
    {
      quote: 'Simple, practical, and budget-aware. We knew exactly what to fix before listing our flat.',
      person: 'Rahul & Neha',
      location: 'Hyderabad'
    },
    {
      quote: 'Great quick-win ideas. Even small bathroom updates improved buyer interest a lot.',
      person: 'Srinivas K.',
      location: 'Bengaluru'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is this valuation guidance?',
      answer: 'Recommendations are based on local improvement data and typical market trends. Use it as a practical decision guide before final pricing.'
    },
    {
      question: 'Is the report free?',
      answer: 'Yes, your personalized report is free to generate and takes only a few minutes.'
    },
    {
      question: 'Do I need a site visit?',
      answer: 'No site visit is needed for the initial report. You can refine plans later with contractors if required.'
    }
  ];

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.email.trim() || !reviewForm.reviewText.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    saveReview({
      name: reviewForm.name,
      email: reviewForm.email,
      rating: reviewForm.rating,
      reviewText: reviewForm.reviewText
    });

    setReviewSubmitted(true);
    setReviewForm({ name: '', email: '', rating: 5, reviewText: '' });
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🏆 Trusted by Indian Homeowners</div>
          <h1>Smart Home Improvements for Maximum Value</h1>
          <p className="hero-subtitle">
            Data-backed improvement recommendations for Indian homes to help you increase value without overspending.
          </p>
          <div className="hero-buttons">
            <Link to="/report" className="btn btn-primary">
              📊 Get Free Valuation Report
            </Link>
            <Link to="/ideas" className="btn btn-secondary">
              💡 Explore Improvement Ideas
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon" aria-hidden="true">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={homeHeroIllustration}
            alt="Illustration of a modern Indian home with value growth indicators"
            className="hero-illustration"
          />
          <div className="visual-card" aria-label="Example valuation increase">
            <div className="card-header">Before: ₹45L</div>
            <div className="card-arrow">→</div>
            <div className="card-header accent">After: ₹58L</div>
            <p className="example-label">
              Example from a 3BHK in Vijayawada after kitchen and bathroom upgrades.
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Designed for Indian Middle-Class Homes</h2>
            <p>Practical solutions that respect your budget and deliver real results</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Budget-Friendly</h3>
              <p>Recommendations starting from ₹10,000 with proven ROI for Indian market conditions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏘️</div>
              <h3>Localized Solutions</h3>
              <p>Tailored for Indian apartments, independent houses, and local construction practices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data-Driven Insights</h3>
              <p>Based on actual Indian real estate data and buyer preferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Implementation</h3>
              <p>Most improvements can be completed within 2-4 weeks with local contractors</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Homeowners Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="testimonial-card">
                <p>“{testimonial.quote}”</p>
                <h3>{testimonial.person}</h3>
                <span>{testimonial.location}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Increase Your Home's Value?</h2>
            <p>Join thousands of Indian homeowners who've added significant value to their properties</p>
            <Link to="/report" className="btn btn-primary large">
              🚀 Start Your Home Improvement Journey
            </Link>
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <div className="container footer-content">
          <div className="footer-section review-section">
            <div className="review-form-wrapper">
              {!showReviewForm ? (
                <div className="review-prompt">
                  <h3>Share Your Experience</h3>
                  <p>Help other homeowners by sharing your GriHom experience</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowReviewForm(true)}
                  >
                    ⭐ Leave a Review
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowReviewForm(false)}
                    aria-label="Close review form"
                  >
                    ✕
                  </button>
                  {reviewSubmitted ? (
                    <div className="review-success">
                      <p>✅ Thank you for your review! We appreciate your feedback.</p>
                    </div>
                  ) : (
                    <div>
                      <h3>Share Your Experience</h3>
                      <form className="review-form" onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                          <label htmlFor="review-name">Your Name</label>
                          <input
                            id="review-name"
                            type="text"
                            name="name"
                            value={reviewForm.name}
                            onChange={handleReviewChange}
                            placeholder="Enter your name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="review-email">Email</label>
                          <input
                            id="review-email"
                            type="email"
                            name="email"
                            value={reviewForm.email}
                            onChange={handleReviewChange}
                            placeholder="your@email.com"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="review-rating">Rating</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`star ${reviewForm.rating >= star ? 'active' : ''}`}
                                onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                                aria-label={`Rate ${star} stars`}
                              >
                                ⭐
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="review-text">Your Review</label>
                          <textarea
                            id="review-text"
                            name="reviewText"
                            value={reviewForm.reviewText}
                            onChange={handleReviewChange}
                            placeholder="Share your experience with GriHom..."
                            rows="4"
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Submit Review
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="footer-brand">
            <h3>GriHom</h3>
            <p>Smart improvement guidance for better home value decisions.</p>
          </div>

          <nav className="footer-links" aria-label="Footer links">
            <Link to="/">Home</Link>
            <Link to="/ideas">Ideas</Link>
            <Link to="/decor">Decor</Link>
            <Link to="/report">Get Report</Link>
          </nav>

          <p className="footer-copy">© {new Date().getFullYear()} GriHom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;