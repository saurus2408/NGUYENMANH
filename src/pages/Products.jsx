import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatPrice } from '../data';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

export default function Products({ products, addToCart }) {
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || 'All';
    setFilter(prev => prev !== type ? type : prev);
  }, [location.search]);
  
  const types = ['All', ...new Set(products.map(p => p.type))];
  
  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLabel = (t) => (t === 'All' ? 'Toàn Bộ Sản Phẩm' : t);

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <SectionTitle title="Sản Phẩm" />

      <div className="search-input-wrapper">
        <input 
          type="text" 
          placeholder="Bạn đang tìm kiếm trà gì?..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Search className="search-icon-inside" size={20} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {types.map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '10px 24px', borderRadius: '30px' }}
          >
            {getLabel(t)}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              formatPrice={formatPrice} 
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.3 }}>🍵</div>
          <h3>Không tìm thấy sản phẩm nào phù hợp với "{searchTerm}"</h3>
          <button className="btn btn-outline" onClick={() => {setSearchTerm(''); setFilter('All');}} style={{ marginTop: '20px' }}>
            Xem lại tất cả sản phẩm
          </button>
        </div>
      )}
    </div>
  );
}
