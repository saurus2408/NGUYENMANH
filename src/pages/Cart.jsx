import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data';
import { Trash2 } from 'lucide-react';

export default function Cart({ cartItems, setCartItems }) {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? {...item, quantity: newQ} : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{textAlign: 'center', paddingTop: '5rem', paddingBottom: '10rem'}}>
        <h2 style={{color: 'var(--primary)', marginBottom: '2rem'}}>Giỏ Hàng Trống</h2>
        <p style={{marginBottom: '2rem', color: 'var(--text-muted)'}}>Bạn chưa chọn sản phẩm nào để thưởng thức.</p>
        <Link to="/products" className="btn btn-primary">Tiếp Tục Mua Sắm</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <h2 style={{color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center'}}>Giỏ Hàng Của Bạn</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '2rem'}}>
        <div style={{overflowX: 'auto'}}>
          <table className="cart-table">
            <thead>
              <tr style={{background: 'var(--bg-dark)'}}>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th style={{textAlign: 'center'}}>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <img src={item.image} alt={item.name} style={{width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover'}} />
                    <strong>{item.name}</strong>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: '4px', width: 'fit-content', margin: '0 auto'}}>
                      <button onClick={() => updateQuantity(item.id, -1)} className="btn" style={{padding: '5px 10px'}}>-</button>
                      <span style={{padding: '0 10px'}}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="btn" style={{padding: '5px 10px'}}>+</button>
                    </div>
                  </td>
                  <td style={{fontWeight: 'bold', color: 'var(--primary)'}}>{formatPrice(item.price * item.quantity)}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} className="btn" style={{color: 'var(--text-muted)', padding: '5px'}}>
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', maxWidth: '400px', marginLeft: 'auto', width: '100%'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Tổng Đơn Hàng</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <span>Tạm tính</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)'}}>
            <span>Phí vận chuyển</span>
            <span>{total >= 500000 ? 'Miễn phí' : formatPrice(30000)}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
            <strong style={{fontSize: '1.2rem'}}>Tổng cộng</strong>
            <strong style={{fontSize: '1.2rem', color: 'var(--accent)'}}>{formatPrice(total + (total >= 500000 ? 0 : 30000))}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary" style={{width: '100%', display: 'block'}}>
            Tiến Hành Thanh Toán
          </Link>
        </div>
      </div>
    </div>
  );
}
