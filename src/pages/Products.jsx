import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, formatPrice } from '../data';
import { Filter } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="product-img" />
    </Link>
    <div className="product-info">
      <h3>{product.name}</h3>
      <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{product.type}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button className="btn btn-primary" onClick={() => addToCart(product)} style={{width: '100%'}}>
        Thêm Vào Giỏ
      </button>
    </div>
  </div>
);

export default function Products({ addToCart }) {
  const [filter, setFilter] = useState('All');
  
  const types = ['All', ...new Set(products.map(p => p.type))];
  
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.type === filter);

  return (
    <div className="container" style={{paddingTop: '3rem'}}>
      <div className="section-title">
        <h2>Bộ Sưu Tập Trà</h2>
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem'}}>
        {types.map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
            style={{padding: '8px 16px'}}
          >
            {t === 'All' ? 'Tất cả' : t}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
