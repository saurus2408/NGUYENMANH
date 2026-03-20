import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Policies from './pages/Policies';
import PromoPopup from './components/PromoPopup';
import './index.css';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href={import.meta.env.BASE_URL} className="logo">
          🍵 Thưởng Trà Quán
        </a>
        <div className={`nav-links ${isOpen ? 'show' : ''}`}>
          <a href={import.meta.env.BASE_URL} className={isActive('/')}>Trang chủ</a>


          <Link to="/products" className={isActive('/products')}>Danh mục</Link>
          <Link to="/about" className={isActive('/about')}>Câu chuyện</Link>
          <Link to="/blog" className={isActive('/blog')}>Kiến thức</Link>
          <Link to="/contact" className={isActive('/contact')}>Liên hệ</Link>
        </div>
        <div className="nav-icons">
          <Link to="/admin"><User size={22} className="nav-icon" /></Link>
          <Search size={22} className="nav-icon" />
          <Link to="/cart" style={{position: 'relative'}}>
            <ShoppingBag size={22} className="nav-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} className="nav-icon" />
          </div>
        </div>
      </div>
      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .nav-links.show { display: flex; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </nav>
  );
};

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <h3>Thưởng Trà Quán</h3>
          <p style={{marginBottom: '1rem', color: '#eee'}}>Nơi đọng lại hương vị tinh hoa của truyền thống, kết nối tâm hồn người Việt qua từng chén trà thơm.</p>
        </div>
        <div className="footer-col">
          <h3>Khám Phá</h3>
          <Link to="/products">Cửa hàng</Link>
          <Link to="/about">Câu chuyện</Link>
          <Link to="/blog">Kiến thức trà</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>
        <div className="footer-col">
          <h3>Chính Sách</h3>
          <Link to="/policies?tab=shipping">Giao hàng</Link>
          <Link to="/policies?tab=return">Đổi trả</Link>
          <Link to="/policies?tab=privacy">Bảo mật thông tin</Link>
        </div>
        <div className="footer-col">
          <h3>Liên Hệ</h3>
          <p style={{color: '#ccc', marginBottom: '0.5rem'}}>📞 0123 456 789</p>
          <p style={{color: '#ccc', marginBottom: '0.5rem'}}>✉️ info@thuongtra.vn</p>
          <p style={{color: '#ccc'}}>📍 123 Phố Cổ, Hà Nội, Việt Nam</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Thưởng Trà Quán. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find(item => item.id === product.id);
    if(existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item));
    } else {
      setCartItems([...cartItems, {...product, quantity}]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <PromoPopup />
      <Navbar cartCount={cartCount} />
      <div style={{minHeight: '80vh'}}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
