import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo light">
            <img 
              src={`${import.meta.env.BASE_URL}logo-tuan-hien.png`}
              alt="Trà Búp Tuấn Hiền" 
              style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }} 
            />
            <div className="logo-text">
              <span className="logo-main" style={{ color: 'white' }}>Tuấn Hiền</span>
              <span className="logo-sub" style={{ color: 'white' }}>Trà Sạch - An Toàn</span>
            </div>
          </div>
          <p className="footer-desc">Mang hương vị trà Búp Tuấn Hiền tinh khiết đến mọi gia đình.</p>
          <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
            <a href="#" aria-label="Facebook" style={{ display: 'inline-block', marginBottom: 0 }}><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" style={{ display: 'inline-block', marginBottom: 0 }}><Instagram size={20} /></a>
            <a href="#" aria-label="Phone" style={{ display: 'inline-block', marginBottom: 0 }}><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Liên Kết</h3>
          <ul>
            <li><Link to="/products">Cửa Hàng</Link></li>
            <li><Link to="/about">Giới Thiệu</Link></li>
            <li><Link to="/contact">Liên Hệ</Link></li>
            <li><Link to="/policies">Chính Sách</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Chính Sách</h3>
          <ul>
            <li><Link to="/policies?tab=shipping">Vận Chuyển</Link></li>
            <li><Link to="/policies?tab=return">Đổi Trả</Link></li>
            <li><Link to="/policies?tab=privacy">Bảo Mật</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Liên Hệ</h3>
          <div className="contact-info" style={{ color: 'var(--text-main)' }}>
            <p><MapPin size={16} /> Thái Nguyên, Việt Nam</p>
            <p><Phone size={16} /> 09xx xxx xxx</p>
            <p><Mail size={16} /> contact@tuanhien.vn</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Trà Búp Tuấn Hiền. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
