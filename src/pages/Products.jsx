import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../data';
import { Filter, Search } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.name} className="product-img" />
    </Link>
    <div className="product-info">
      <h3>{product.name}</h3>
      <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>{product.type}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button className="btn btn-primary" onClick={() => addToCart(product)} style={{width: '100%'}}>
        Thêm Vào Giỏ
      </button>
    </div>
  </div>
);

export default function Products({ products, addToCart }) {
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setFilter(type);
    } else {
      setFilter('All');
    }
  }, [location]);
  
  const types = ['All', ...new Set(products.map(p => p.type))];
  
  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLabel = (t) => {
    if (t === 'All') return 'Toàn Bộ Sản Phẩm';
    return t;
  };

  return (
    <div className="container" style={{paddingTop: '3rem'}}>
      <div className="section-title">
        <h2>Sản Phẩm</h2>
      </div>

      <div style={{maxWidth: '600px', margin: '0 auto 2.5rem', position: 'relative'}}>
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Search className="search-icon-inside" size={20} />
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem'}}>
        {types.map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
            style={{padding: '8px 16px'}}
          >
            {getLabel(t)}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)'}}>
          <h3>Không tìm thấy sản phẩm nào phù hợp với "{searchTerm}"</h3>
        </div>
      )}

      <style>{`
        .search-input {
          width: 100%;
          padding: 12px 20px 12px 45px;
          border: 1px solid var(--border);
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          background: var(--bg-dark);
        }
        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }
        .search-icon-inside {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
