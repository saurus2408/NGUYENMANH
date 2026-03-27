import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data';
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Sản phẩm không tồn tại</h2>
        <Link to="/products" className="btn btn-primary">Quay lại cửa hàng</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
        <ArrowLeft size={20} /> Quay lại
      </Link>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
        <div className="product-image">
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: 'cover', aspectRatio: '1/1' }} />
        </div>

        <div className="product-info">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem' }}>{product.type}</span>
            {product.bestseller && <span style={{ background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem' }}>Bán chạy</span>}
          </div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>{product.origin}</p>
          <p style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '30px' }}>{formatPrice(product.price)}</p>
          
          <div style={{ marginBottom: '30px' }}>
             <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Mô tả sản phẩm:</p>
             <p style={{ color: '#444', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Công dụng:</p>
            <ul style={{ paddingLeft: '20px', color: '#444' }}>
              {(product.health_benefits || product.healthBenefits || []).map((benefit, idx) => (
                <li key={idx} style={{ marginBottom: '5px' }}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <span style={{ fontWeight: 'bold' }}>Số lượng:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', borderRight: '1px solid #ddd' }}
              >-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '50px', textAlign: 'center', border: 'none', outline: 'none', fontWeight: 'bold' }} 
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', borderLeft: '1px solid #ddd' }}
              >+</button>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleAddToCart}
            style={{ width: '100%', height: '56px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <ShoppingCart /> {added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
              <Truck size={18} color="var(--primary)" /> Giao hàng toàn quốc
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
              <ShieldCheck size={18} color="var(--primary)" /> Đảm bảo chất lượng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
