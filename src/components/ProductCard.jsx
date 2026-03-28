import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, addToCart, formatPrice }) => {
  return (
    <div className="product-card">
      {product.type && <span className="glass-badge">{product.type}</span>}
      {product.originalPrice > product.price && (
        <span className="glass-badge" style={{ left: 'auto', right: '10px', background: '#d32f2f', color: 'white', border: 'none', fontWeight: 'bold' }}>
          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
        </span>
      )}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          {product.originalPrice > product.price && (
            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="product-price" style={{ marginBottom: 0 }}>{formatPrice(product.price)}</span>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <ShoppingCart size={18} /> THÊM VÀO GIỎ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
