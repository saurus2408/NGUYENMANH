import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, bgImage, ctaText, ctaLink, children }) => (
  <section className="hero" style={{ backgroundImage: `url('${bgImage}')` }}>
    <div className="hero-content">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {ctaText && (
        <Link to={ctaLink} className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '15px 40px', borderRadius: '50px', boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)' }}>
          {ctaText}
        </Link>
      )}
      {children}
    </div>
  </section>
);

export default Hero;
