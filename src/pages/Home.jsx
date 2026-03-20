import React from 'react';
import { Link } from 'react-router-dom';
import { products, formatPrice } from '../data';

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    {product.bestseller && <span className="glass-badge">Bán Chạy Ngoại Hạng</span>}
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="product-img" />
    </Link>
    <div className="product-info">
      <h3>{product.name}</h3>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button className="btn btn-primary" onClick={() => addToCart(product)} style={{width: '100%'}}>
        Thêm Vào Giỏ
      </button>
    </div>
  </div>
);

export default function Home({ addToCart }) {
  const bestsellers = products.filter(p => p.bestseller);

  return (
    <div>
      <section className="hero" style={{backgroundImage: "url('https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?auto=format&fit=crop&q=80&w=1600')"}}>
        <div className="hero-content">
          <h1>Tinh Hoa Trà Việt</h1>
          <p>Hương vị ngàn năm đọng lại trong từng giọt tinh khiết. Đắm chìm trong nghệ thuật thưởng trà cùng những dòng trà thượng hạng nhất.</p>
          <Link to="/products" className="btn btn-accent" style={{fontSize: '1.2rem', padding: '15px 35px'}}>Khám Phá Ngay</Link>
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2 style={{color: 'var(--primary)'}}>Sản Phẩm Nổi Bật</h2>
        </div>
        <div className="products-grid">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🌿</div>
              <h3 style={{color: 'white'}}>100% Hữu Cơ</h3>
              <p>Thu hoạch từ những vườn trà chuẩn Organic, không hóa chất.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👐</div>
              <h3 style={{color: 'white'}}>Thủ Công</h3>
              <p>Quy trình sao trà truyền thống gia truyền giữ trọn hương vị nguyên bản.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3 style={{color: 'white'}}>Giao Hàng Nhanh</h3>
              <p>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
