import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../data';
import { database } from '../supabase';

export default function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'bank_transfer'
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Polling for payment status if QR is shown
  useEffect(() => {
    let interval;
    if (showQR && orderId && paymentStatus === 'pending') {
      interval = setInterval(async () => {
        try {
          const currentOrder = await database.getOrderById(orderId);
          if (currentOrder && currentOrder.status === 'paid') {
            setPaymentStatus('paid');
            clearInterval(interval);
            setTimeout(() => {
              handleFinishPayment();
            }, 2000);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 3000); // Poll every 3 seconds for faster detection
    }
    return () => clearInterval(interval);
  }, [showQR, orderId, paymentStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (cartItems.length === 0) {
      setErrorMessage("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
      setErrorMessage("Số điện thoại không hợp lệ (cần 10 chữ số, ví dụ: 0912345678)");
      return;
    }

    setLoading(true);
    try {
      const order = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        payment_mode: formData.paymentMethod,
        total: totalPrice,
        items: cartItems,
      };

      const newOrder = await database.addOrder(order);
      setOrderId(newOrder.id);

      if (formData.paymentMethod === 'bank_transfer') {
        setShowQR(true);
      } else {
        alert("Đặt hàng thành công! Cảm ơn bạn đã tin tưởng Thưởng Trà Quán.");
        setCartItems([]);
        navigate('/');
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Lỗi đặt hàng: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleFinishPayment = () => {
    alert("Tạo đơn hàng thành công! Chúng tôi đã nhận được thanh toán của bạn.");
    setCartItems([]);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (showQR) {
    const qrUrl = `https://img.vietqr.io/image/TCB-1924082006-compact2.png?amount=${totalPrice}&addInfo=CHT${orderId || formData.phone}&accountName=HOANG%20XUAN%20GIAO`;
    
    return (
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto', background: '#fff', padding: '50px 40px', borderRadius: '32px', boxShadow: '0 25px 60px rgba(45, 90, 39, 0.12)', border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'inline-block', padding: '10px 20px', background: '#e8f5e9', borderRadius: '50px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '25px' }}>
             {paymentStatus === 'paid' ? '🎉 HOÀN TẤT' : '🛡️ ĐANG CHỜ THANH TOÁN AN TOÀN'}
          </div>

          <h2 style={{ color: 'var(--primary)', marginBottom: '15px', fontSize: '2rem' }}>
            {paymentStatus === 'paid' ? 'Thanh toán thành công!' : 'Quét Mã Để Hoàn Tất'}
          </h2>
          
          <p style={{ marginBottom: '35px', color: '#666', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {paymentStatus === 'paid' 
              ? 'Thưởng Trà Quán đã nhận được tiền công đức. Chúng tôi đang chuẩn bị trà gửi tới bạn.' 
              : 'Hệ thống tự động xác nhận sau 1-3 giây ngay khi bạn chuyển khoản thành công.'}
          </p>
          
          {paymentStatus === 'pending' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center', marginBottom: '40px' }}>
              <div style={{ padding: '20px', background: '#fdfcf8', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <img 
                  src={qrUrl} 
                  alt="VietQR Techcombank" 
                  style={{ width: '100%', borderRadius: '12px' }} 
                />
                <div style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>
                  <span className="loader-dots">Đang chờ tín hiệu...</span>
                </div>
              </div>

              <div style={{ textAlign: 'left', padding: '25px', background: 'var(--bg-dark)', borderRadius: '24px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Ngân hàng</small>
                    <p style={{ margin: 0, fontWeight: 600 }}>Techcombank</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Số tài khoản</small>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>1924082006</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Chủ tài khoản</small>
                    <p style={{ margin: 0, fontWeight: 600 }}>HOÀNG XUÂN GIAO</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Số tiền</small>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '1.3rem', color: 'var(--accent)' }}>{formatPrice(totalPrice)}</p>
                </div>
                <div>
                    <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Nội dung</small>
                    <p style={{ margin: 0, fontWeight: 700, background: '#fff', padding: '5px 10px', borderRadius: '6px', display: 'inline-block' }}>CHT{orderId || formData.phone}</p>
                </div>
              </div>
            </div>
          )}

          {paymentStatus === 'paid' ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', background: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <span style={{ fontSize: '3.5rem' }}>✅</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>Đang chuyển hướng về trang chủ...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={async () => {
                    setLoading(true);
                    const order = await database.getOrderById(orderId);
                    if (order?.status === 'paid') setPaymentStatus('paid');
                    else alert("Chưa nhận được thanh toán. Vui lòng chờ 1-3 giây để ngân hàng xử lý giao dịch của bạn.");
                    setLoading(false);
                  }}
                  style={{ padding: '15px', borderRadius: '15px', fontWeight: 600 }}
                >
                  XÁC NHẬN ĐÃ CHUYỂN
                </button>
                <button 
                className="btn btn-outline" 
                onClick={() => navigate('/')}
                style={{ padding: '15px', borderRadius: '15px', border: '1px solid #ddd', color: '#666' }}
              >
                QUAY LẠI SAU
              </button>
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>
            * Lưu ý: Vui lòng nhập đúng nội dung chuyển khoản để hệ thống cộng tiền tự động. 
            Mọi thắc mắc vui lòng liên hệ hotline: 09xx xxx xxx.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <h1>Thanh Toán</h1>
      <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', marginTop: '40px' }}>
        <div className="checkout-form">
          <h3>Thông tin giao hàng</h3>
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffe6e6', borderRadius: '8px', fontSize: '0.9rem' }}>
              ⚠️ {errorMessage}
            </div>
          )}
          <form style={{ display: 'grid', gap: '20px', marginTop: '20px' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>Họ và tên *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nhập họ và tên" required style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #e1e1e1', transition: 'all 0.3s' }} />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>Số điện thoại *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nhập số điện thoại" required style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #e1e1e1' }} />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>Địa chỉ nhận hàng *</label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." required style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #e1e1e1', minHeight: '100px', resize: 'vertical' }} />
            </div>
            <div className="payment-methods" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px' }}>
              <label style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '15px', display: 'block' }}>Phương thức thanh toán</label>
              <div style={{ display: 'grid', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '10px', background: formData.paymentMethod === 'bank_transfer' ? '#fff' : 'transparent', borderRadius: '10px', transition: '0.3s', border: formData.paymentMethod === 'bank_transfer' ? '1px solid var(--primary)' : '1px solid transparent' }}>
                  <input type="radio" name="paymentMethod" value="bank_transfer" checked={formData.paymentMethod === 'bank_transfer'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} /> 
                  <div>
                    <span style={{ fontWeight: 600 }}>Chuyển khoản VietQR</span>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Xác nhận tự động, ưu tiên giao nhanh</p>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '10px', background: formData.paymentMethod === 'cod' ? '#fff' : 'transparent', borderRadius: '10px', transition: '0.3s', border: formData.paymentMethod === 'cod' ? '1px solid var(--primary)' : '1px solid transparent' }}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} style={{ width: '18px', height: '18px' }} />
                  <div>
                    <span style={{ fontWeight: 600 }}>Thanh toán khi nhận hàng (COD)</span>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Thanh toán tiền mặt cho nhân viên giao hàng</p>
                  </div>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '18px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 600, boxShadow: '0 4px 15px rgba(0,0,0,0.1)', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span className="spinner"></span> ĐANG XỬ LÝ...
                </span>
              ) : 'XÁC NHẬN ĐẶT HÀNG'}
            </button>
          </form>
        </div>

        <div className="order-summary" style={{ background: '#f9f9f9', padding: '30px', borderRadius: '20px' }}>
          <h3>Đơn hàng của bạn</h3>
          <div style={{ marginTop: '20px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Tổng cộng</span>
              <span color="var(--accent)" style={{ color: 'var(--accent)' }}>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

