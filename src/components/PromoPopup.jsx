import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { database } from '../supabase';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [promo, setPromo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivePromo = async () => {
      try {
        const promos = await database.getPromotions();
        const active = promos.find(p => p.is_active);
        if (active) {
          setPromo(active);
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 1000); // Popup appears after 1 second
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Lỗi lấy dữ liệu PromoPopup:", err);
      }
    };
    fetchActivePromo();
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handlePromoClick = () => {
    navigate('/products');
    closePopup();
  };

  if (!isVisible || !promo) return null;

  return (
    <div className="promo-overlay" onClick={closePopup}>
      <div className="promo-container" onClick={(e) => e.stopPropagation()}>
        <button className="promo-close" onClick={closePopup}>
          <X size={24} />
        </button>
        <div className="promo-content" onClick={handlePromoClick} style={{ cursor: 'pointer' }}>
          <div className="promo-image-wrapper">
            <img src={promo.image} alt={promo.title || "Promotion Banner"} className="promo-image" />
            {promo.badge && <div className="promo-badge">{promo.badge}</div>}
          </div>
          <div className="promo-details">
            <h2>{promo.title}</h2>
            <p>{promo.description}</p>
            <button className="btn btn-primary promo-btn">Mua Ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;

