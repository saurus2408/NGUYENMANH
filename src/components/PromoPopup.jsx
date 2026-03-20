import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Reduced to 1s for better responsive feel
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handlePromoClick = () => {
    navigate('/products');
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <div className="promo-overlay" onClick={closePopup}>
      <div className="promo-container" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" onClick={closePopup}>
          <X size={24} />
        </button>
        <div className="promo-content" onClick={handlePromoClick} style={{ cursor: 'pointer' }}>
          <div className="promo-image-wrapper">
            <img src="/assets/promo-banner.png" alt="Promotion Banner" className="promo-image" />
            <div className="promo-badge">Ưu đãi 50%</div>
          </div>
          <div className="promo-details">
            <h2>Khai Trương Thưởng Trà</h2>
            <p>Nhận ngay mã giảm giá cho đơn hàng đầu tiên của bạn. Hãy để chúng tôi mang hương vị tinh túy của trà đến ngôi nhà của bạn.</p>
            <div className="promo-code">CODE: <span className="highlight">THUONGTRA50</span></div>
            <button className="btn btn-primary promo-btn">Mua Ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;

