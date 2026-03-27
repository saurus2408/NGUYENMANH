import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ShoppingCart as CartIcon,
  Search,
  Menu,
  X,
  User,
  Facebook,
  Instagram,
  Phone,
  MapPin,
  Mail,
  ChevronRight
} from 'lucide-react';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Policies from './pages/Policies';
import PromoPopup from './components/PromoPopup';
import './index.css';
import { database } from './supabase';

const Navbar = ({ cartCount, triggerPromo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => triggerPromo()}>
          <img src="logo-tuan-hien.png" alt="Trà Búp Tuấn Hiền" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
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
          <Link to="/admin" className="nav-icon"><User size={24} /></Link>
          <Link to="/cart" className="nav-icon cart-trigger">
            <CartIcon size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Sản Phẩm</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>Câu Chuyện</Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Kiến Thức Trà</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Liên Hệ</Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Quản Trị</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-section">
          <div className="logo light">
            <img src="/logo-tuan-hien.png" alt="Trà Búp Tuấn Hiền" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }} />
            <div className="logo-text">
              <span className="logo-main text-white">Tuấn Hiền</span>
              <span className="logo-sub text-white">Trà Sạch - An Toàn</span>
            </div>
          </div>
          <p className="footer-desc">Mang hương vị trà Búp Tuấn Hiền tinh khiết đến mọi gia đình.</p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Liên Kết</h4>
          <ul>
            <li><Link to="/products">Cửa Hàng</Link></li>
            <li><Link to="/about">Giới Thiệu</Link></li>
            <li><Link to="/contact">Liên Hệ</Link></li>
            <li><Link to="/policies">Chính Sách</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Chính Sách</h4>
          <ul>
            <li><Link to="/policies?tab=shipping">Vận Chuyển</Link></li>
            <li><Link to="/policies?tab=return">Đổi Trả</Link></li>
            <li><Link to="/policies?tab=privacy">Bảo Mật</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Liên Hệ</h4>
          <div className="contact-info">
            <p><MapPin size={16} /> Thái Nguyên, Việt Nam</p>
            <p><Phone size={16} /> 0968 234 567</p>
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

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [promoKey, setPromoKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbProducts = await database.getProducts();
        if (dbProducts) {
          setProducts(dbProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch DB error:", err);
        setProducts([]);
      } finally {
        setIsDataLoaded(true);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product, quantity = 1) => {
    const qty = parseInt(quantity);
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty }]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <PromoPopup key={promoKey} />
      <Navbar cartCount={cartCount} triggerPromo={() => setPromoKey(prev => prev + 1)} />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin products={products} setProducts={setProducts} fetchData={() => { }} />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
