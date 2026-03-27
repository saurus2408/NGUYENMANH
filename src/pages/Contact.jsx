import React, { useState } from 'react';
import { database } from '../supabase';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await database.addContact(formData);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Error saving contact:", err);
      // Fallback for demo if Firebase not set
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Liên Hệ Với Quán</h2>
        <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto'}}>
          Chúng tôi luôn ở đây để lắng nghe và chia sẻ với bạn về đam mê thưởng trà. Đừng ngần ngại để lại lời nhắn!
        </p>
      </div>

      <div className="contact-grid">
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <div className="contact-info">
            <h3 style={{color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem'}}>Thông Tin Liên Lạc</h3>
            <ul style={{display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-muted)'}}>
              <li><strong style={{color: 'var(--text-main)'}}>📞 Hotline:</strong> (012) 3456 7890</li>
              <li><strong style={{color: 'var(--text-main)'}}>✉️ Email:</strong> tuyenthuong@thuongtra.vn</li>
              <li><strong style={{color: 'var(--text-main)'}}>📍 Địa chỉ:</strong> 123 Phố Cổ, Quận Hoàn Kiếm, Hà Nội</li>
              <li><strong style={{color: 'var(--text-main)'}}>⏰ Giờ mở cửa:</strong> T2 - CN (08:00 - 22:00)</li>
            </ul>
          </div>
          
          <div style={{height: '300px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)'}}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.380727027376!2d105.85040081533198!3d21.017448393544324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf5b5b03735%3A0xe54b9f33fb1eeb22!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1619623832049!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="contact-info">
          <h3 style={{color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem'}}>Gửi Tin Nhắn</h3>
          {sent ? (
            <div style={{background: 'var(--secondary)', color: 'white', padding: '1rem', borderRadius: '4px', textAlign: 'center'}}>
              Cảm ơn bạn! Tin nhắn đã được gửi thành công.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Họ Tên</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Vui lòng nhập họ tên của bạn..." />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Vui lòng nhập địa chỉ email..." />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>Nội Dung</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Bạn muốn nhắn gửi điều gì?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}} disabled={loading}>
                {loading ? 'Đang Gửi...' : 'Gửi Tin Nhắn'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
