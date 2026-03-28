import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
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

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [promoKey, setPromoKey] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbProducts = await database.getProducts();
        setProducts(dbProducts || []);
      } catch (err) {
        console.error("Fetch DB error:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <PromoPopup key={promoKey} />
      <Header cartCount={cartCount} triggerPromo={() => setPromoKey(prev => prev + 1)} />
      <main style={{ minHeight: '80vh' }}>
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
      </main>
      <Footer />
    </Router>
  );
}
