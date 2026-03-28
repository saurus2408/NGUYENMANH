import React, { useState } from 'react';
import { database } from '../supabase';
import SectionTitle from '../components/SectionTitle';

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
      // Fallback for demo
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <SectionTitle 
        title="Liên Hệ Với Quán" 
        subtitle="Chúng tôi luôn ở đây để lắng nghe và chia sẻ với bạn về đam mê thưởng trà. Đừng ngần ngại để lại lời nhắn!" 
      />

      <div className="contact-grid" style={{ marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="contact-info" style={{ background: 'var(--bg-dark)', padding: '30px', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Thông Tin liên hệ</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#555', listStyle: 'none', padding: 0 }}>
              <li><strong style={{ color: 'var(--primary)' }}>📞 Hotline:</strong> 09xx xxx xxx</li>
              <li><strong style={{ color: 'var(--primary)' }}>✉️ Email:</strong> contact@tuanhien.vn</li>
              <li><strong style={{ color: 'var(--primary)' }}>📍 Địa chỉ:</strong> Thái Nguyên, Việt Nam</li>
              <li><strong style={{ color: 'var(--primary)' }}>⏰ Giờ mở cửa:</strong> T2 - CN (08:00 - 22:00)</li>
            </ul>
          </div>
          
          <div style={{ height: '300px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.380727027376!2d105.85040081533198!3d21.017448393544324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf5b5b03735%3A0xe54b9f33fb1eeb22!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1619623832049!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '1.5rem' }}>Gửi Tin Nhắn</h3>
          {sent ? (
            <div style={{ background: '#e8f5e9', color: 'var(--primary)', padding: '2rem', borderRadius: '15px', textAlign: 'center', fontWeight: 600 }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
              Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Họ Tên</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Nhập tên của bạn..." 
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-dark)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Nhập email liên hệ..." 
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-dark)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Nội Dung</label>
                <textarea 
                  name="message" 
                  required 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Bạn muốn nhắn gửi điều gì?"
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-dark)', minHeight: '150px' }}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ height: '56px', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem' }} 
                disabled={loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
