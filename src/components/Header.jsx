import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart as CartIcon, User, Menu, X } from 'lucide-react';

const Header = ({ cartCount, triggerPromo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => triggerPromo()}>
          <img 
            src={`${import.meta.env.BASE_URL}logo-tuan-hien.png`}
            alt="Trà Búp Tuấn Hiền" 
            style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
          />
          <div className="logo-text">
            <span className="logo-main">Trà Búp</span>
            <span className="logo-sub">Tuấn Hiền</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Trang Chủ</Link>
          <div className="dropdown">
            <Link to="/products" className="nav-link">Sản Phẩm</Link>
            <div className="dropdown-menu">
              <Link to="/products" className="dropdown-item">Tất Cả Sản Phẩm</Link>
              <Link to="/products?type=Chè" className="dropdown-item">Chè</Link>
              <Link to="/products?type=Kẹo Lạc" className="dropdown-item">Kẹo Lạc</Link>
            </div>
          </div>
          <Link to="/about" className="nav-link">Câu Chuyện</Link>
          <Link to="/blog" className="nav-link">Kiến Thức Trà</Link>
          <Link to="/contact" className="nav-link">Liên Hệ</Link>
        </div>

        <div className="nav-actions">
          <Link to="/admin" className="nav-icon" title="Quản trị"><User size={24} /></Link>
          <Link to="/cart" className="nav-icon cart-trigger" title="Giỏ hàng">
            <CartIcon size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={closeMenu}>Trang Chủ</Link>
          <Link to="/products" onClick={closeMenu}>Sản Phẩm</Link>
          <Link to="/about" onClick={closeMenu}>Câu Chuyện</Link>
          <Link to="/blog" onClick={closeMenu}>Kiến Thức Trà</Link>
          <Link to="/contact" onClick={closeMenu}>Liên Hệ</Link>
          <Link to="/admin" onClick={closeMenu}>Quản Trị</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
