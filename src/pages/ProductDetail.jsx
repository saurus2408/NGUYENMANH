import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data';
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
        <h2>Sản phẩm không tìm thấy</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>Quay lại cửa hàng</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const benefits = product.health_benefits || product.healthBenefits || [];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Link to="/products" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', border: 'none', padding: 0 }}>
        <ArrowLeft size={18} /> Quay lại cửa hàng
      </Link>

      <div className="product-detail-grid">
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', aspectRatio: '1/1', objectFit: 'cover' }} 
          />
        </div>

        <div className="product-info-panel">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <span className="badge badge-primary">{product.type}</span>
            {product.bestseller && <span className="badge badge-accent">Bán chạy</span>}
          </div>
          
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: 'var(--primary)' }}>{product.name}</h1>
          <p style={{ color: '#888', marginBottom: '25px', fontSize: '1.1rem' }}>Nguồn gốc: {product.origin}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '35px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 800 }}>{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
               <span style={{ fontSize: '1.3rem', color: '#aaa', textDecoration: 'line-through' }}>{formatPrice(product.originalPrice)}</span>
            )}
            {product.originalPrice > product.price && (
               <span style={{ background: '#ffebee', color: '#d32f2f', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.9rem', verticalAlign: 'middle' }}>
                 Giảm {Math.round((1 - product.price / product.originalPrice) * 100)}%
               </span>
            )}
            <span style={{ color: '#999', fontSize: '1rem' }}>/ Gói</span>
          </div>
          
          <div style={{ marginBottom: '40px' }}>
             <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '1.1rem' }}>Mô tả sản phẩm:</p>
             <p style={{ color: '#555', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          {benefits.length > 0 && (
            <div style={{ background: 'var(--bg-dark)', padding: '25px', borderRadius: '24px', marginBottom: '40px', border: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 700, marginBottom: '15px' }}>Công dụng nổi bật:</p>
              <ul style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                {benefits.map((benefit, idx) => (
                  <li key={idx} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#555' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '30px' }}>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input 
                className="quantity-input"
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleAddToCart}
              style={{ flex: 1, padding: '18px', borderRadius: '15px', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <ShoppingCart size={20} /> {added ? 'ĐÃ THÊM VÀO GIỎ!' : 'THÊM VÀO GIỎ HÀNG'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#666' }}>
              <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '12px' }}>
                <Truck size={20} color="var(--primary)" />
              </div>
              Giao hàng toàn quốc
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#666' }}>
              <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '12px' }}>
                <ShieldCheck size={20} color="var(--primary)" />
              </div>
              Cam kết ATVSTP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
