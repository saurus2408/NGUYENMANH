import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data';
import { Star, Truck, MapPin, Droplets } from 'lucide-react';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="container" style={{padding: '5rem 0'}}>Không tìm thấy sản phẩm.</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="detail-grid">
        <div>
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>
        <div className="detail-info">
          <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>&larr; Trở về danh mục</p>
          <h1>{product.name}</h1>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1rem', color: 'var(--accent)'}}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} size={18} />
            ))}
            <span style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '10px'}}>{product.rating} ({product.reviews} đánh giá)</span>
          </div>

          <div className="detail-price">{formatPrice(product.price)}</div>
          
          <p className="detail-desc">{product.description}</p>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
            <MapPin size={20} color="var(--primary)"/>
            <span><strong>Nguồn gốc:</strong> {product.origin}</span>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
            <div style={{display: 'flex', border: '1px solid var(--border)', borderRadius: '4px'}}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn" style={{padding: '8px 15px'}}>-</button>
              <input type="number" value={quantity} readOnly style={{width: '50px', textAlign: 'center', border: 'none'}} />
              <button onClick={() => setQuantity(quantity + 1)} className="btn" style={{padding: '8px 15px'}}>+</button>
            </div>
            <button className="btn btn-primary" onClick={handleAddToCart} style={{flex: 1, padding: '14px 24px'}}>
              🛒 Thêm Vào Giỏ Hàng
            </button>
          </div>

          <div style={{marginTop: '3rem'}}>
            <h3>Lợi Ích Sức Khỏe</h3>
            <ul style={{listStyleType: 'disc', paddingLeft: '20px', marginBottom: '2rem'}}>
              {product.healthBenefits.map((benefit, index) => (
                <li key={index} style={{marginBottom: '0.5rem'}}>{benefit}</li>
              ))}
            </ul>

            <h3>Hướng Dẫn Pha Trà</h3>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--bg-dark)', padding: '15px', borderRadius: '8px'}}>
              <div style={{color: '#2b90d9'}}><Droplets size={24}/></div>
              <p style={{margin: 0}}>{product.brewing}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
