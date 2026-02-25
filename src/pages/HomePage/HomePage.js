import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import homeHeroIllustration from '../../assets/home-hero.svg';
import logo from '../../assets/grihom-logo.svg';

const HomePage = () => {
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
      answer: 'Recommendations are based on local improvement data and typical market trends. Use it as a practical decision guide before final pricing. Additionally, we continuously update our database to reflect the latest market conditions, ensuring you get the most relevant advice.'
    },
    {
      question: 'Is the report free?',
      answer: 'Yes, your personalized report is free to generate and takes only a few minutes. There are no hidden charges, and you can generate multiple reports for different properties.'
    },
    {
      question: 'Do I need a site visit?',
      answer: 'No site visit is needed for the initial report. You can refine plans later with contractors if required. However, if you wish, we can connect you with trusted local professionals for an on-site consultation.'
    },
    {
      question: 'Can I trust the contractors you recommend?',
      answer: 'We carefully vet all contractors in our network to ensure they meet high standards of quality and reliability. You can also review ratings and feedback from other homeowners before making a decision.'
    },
    {
      question: 'How long does it take to see results?',
      answer: 'The timeline depends on the scope of your improvements. Simple upgrades can show results in weeks, while larger projects may take a few months. Our team is here to guide you every step of the way.'
    },
    {
      question: 'What if I have a unique property?',
      answer: 'Our recommendations are tailored to your property’s unique features and location. If you have specific concerns, our experts are available to provide personalized advice.'
    }
  ];

  // Function to get the first initial
  const getInitial = (name) => name.charAt(0).toUpperCase();

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
            <img src={logo} alt="Logo" className="logo" /> {/* Updated logo reference */}
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="testimonial-card">
                <div className="avatar" aria-hidden="true">
                  {getInitial(testimonial.person)}
                </div>
                <div className="testimonial-content">
                  <p>“{testimonial.quote}”</p>
                  <h3>{testimonial.person}</h3>
                  <span>{testimonial.location}</span>
                </div>
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
    </div>
  );
};

export default HomePage;