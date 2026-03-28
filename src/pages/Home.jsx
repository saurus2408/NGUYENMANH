import React from 'react';
import { formatPrice } from '../data';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

export default function Home({ products, addToCart }) {
  const bestsellers = products.filter(p => p.bestseller);

  return (
    <div>
      <Hero 
        title="Trà Búp Tuấn Hiền"
        subtitle="Tinh hoa trà xanh Thái Nguyên - Sạch và An toàn từ tâm người làm trà gia truyền."
        bgImage={`${import.meta.env.BASE_URL}bg-hero.jpg`}
        ctaText="Khám Phá Ngay"
        ctaLink="/products"
      >
        <div className="social-link-group">
          <a href="https://zalo.me/09xxxxxxxx" target="_blank" rel="noopener noreferrer" className="social-link-btn btn-zalo" title="Zalo">
            <span style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '-0.3px' }}>Zalo</span>
          </a>
          <a href="https://facebook.com/tuantu.phan.73" target="_blank" rel="noopener noreferrer" className="social-link-btn btn-facebook" title="Facebook">
            <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="tel:09xxxxxxxx" className="social-link-btn btn-phone" title="Gọi điện">
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
        </div>
      </Hero>

      <section className="container" style={{ padding: '60px 0' }}>
        <SectionTitle title="Sản Phẩm Nổi Bật" />
        <div className="products-grid" style={{ marginTop: '40px' }}>
          {bestsellers.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              formatPrice={formatPrice} 
            />
          ))}
        </div>
      </section>

      <section className="features">
        <div className="container" style={{ padding: '60px 0' }}>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🌿</div>
              <h3 style={{ color: 'white' }}>100% Hữu Cơ</h3>
              <p>Thu hoạch từ những vườn trà chuẩn Organic, không hóa chất.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👐</div>
              <h3 style={{ color: 'white' }}>Thủ Công</h3>
              <p>Quy trình sao trà truyền thống gia truyền giữ trọn hương vị nguyên bản.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3 style={{ color: 'white' }}>Giao Hàng Nhanh</h3>
              <p>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
