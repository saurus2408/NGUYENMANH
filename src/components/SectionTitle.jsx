import React from 'react';

const SectionTitle = ({ title, subtitle }) => (
  <div className="section-title">
    <h2>{title}</h2>
    {subtitle && <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{subtitle}</p>}
  </div>
);

export default SectionTitle;
