import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../data';

export default function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMode: 'cod'
  });

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = total >= 500000 ? 0 : 30000;
  const finalTotal = total + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cảm ơn ${formData.name}! Đơn hàng của bạn đã được đặt thành công.`);
    setCartItems([]);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <h2 style={{color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center'}}>Thanh Toán</h2>
      
      <div className="contact-grid">
        <div style={{background: 'white', padding: '2rem', borderRadius: '8px'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Thông Tin Giao Hàng</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <label>Họ và Tên *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label>Số Điện Thoại *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label>Địa Chỉ Giao Hàng *</label>
              <textarea name="address" required value={formData.address} onChange={handleChange} style={{height: '100px'}}></textarea>
            </div>
            
            <h3 style={{marginTop: '1.5rem', marginBottom: '1rem'}}>Phương Thức Thanh Toán</h3>
            <div style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="radio" name="paymentMode" value="cod" checked={formData.paymentMode === 'cod'} onChange={handleChange} />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="radio" name="paymentMode" value="bank" checked={formData.paymentMode === 'bank'} onChange={handleChange} />
                Chuyển khoản ngân hàng
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="radio" name="paymentMode" value="wallet" checked={formData.paymentMode === 'wallet'} onChange={handleChange} />
                Ví điện tử (Momo, ZaloPay)
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{marginTop: '2rem', width: '100%'}}>Hoàn Tất Đặt Hàng</button>
          </form>
        </div>

        <div style={{background: 'var(--bg-dark)', padding: '2rem', borderRadius: '8px', height: 'fit-content'}}>
          <h3 style={{marginBottom: '1.5rem'}}>Đơn Hàng ({cartItems.length} sản phẩm)</h3>
          
          <div style={{marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto'}}>
            {cartItems.map(item => (
              <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                <span>{item.name} x {item.quantity}</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          
          <div style={{borderTop: '1px solid var(--border)', paddingTop: '1.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <span>Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <span>Phí vận chuyển</span>
              <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--primary)', paddingTop: '1rem', marginTop: '1rem'}}>
              <strong style={{fontSize: '1.2rem', color: 'var(--primary)'}}>Tổng cộng</strong>
              <strong style={{fontSize: '1.4rem', color: 'var(--accent)'}}>{formatPrice(finalTotal)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
