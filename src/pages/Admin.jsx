import React, { useState } from 'react';
import { products as initialProducts, formatPrice } from '../data';
import { Edit2, Save, Trash2, Plus } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('adminAuth') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSave = () => {
    setProducts(products.map(p => p.id === editingId ? editForm : p));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      name: 'Sản Phẩm Trà Mới',
      type: 'Loại Khác',
      price: 100000,
      image: '',
      origin: '',
      description: '',
      healthBenefits: [],
      brewing: '',
      rating: 5,
      reviews: 0,
      bestseller: false
    };
    setProducts([...products, newProduct]);
    handleEdit(newProduct);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{paddingTop: '5rem', paddingBottom: '10rem', display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px'}}>
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>🔒 Quản Trị Hệ Thống</h2>
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label>Tên đăng nhập:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none'}}
                required
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label>Mật khẩu:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none'}}
                required
              />
            </div>
            {loginError && <p style={{color: 'red', fontSize: '0.9rem', textAlign: 'center'}}>{loginError}</p>}
            <button type="submit" className="btn btn-primary" style={{marginTop: '1rem', padding: '15px'}}>Đăng nhập</button>
          </form>
          <p style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666'}}>
            * Chỉ chủ trang web mới có quyền truy cập vào khu vực này.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2>Quản Trị Sản Phẩm</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Chào mừng Admin! Bạn có thể chỉnh sửa sản phẩm tại đây.</p>
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="btn btn-outline" onClick={handleLogout} style={{borderColor: '#ddd', color: '#666'}}>Đăng xuất</button>
          <button className="btn btn-primary" onClick={handleAdd} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <Plus size={18} /> Thêm Mới
          </button>
        </div>
      </div>


      <div style={{overflowX: 'auto'}}>
        <table className="cart-table">
          <thead>
            <tr style={{background: 'var(--primary)', color: 'white'}}>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Nổi bật</th>
              <th style={{textAlign: 'center'}}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img src={p.image || "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9"} alt={p.name} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}} />
                </td>
                
                {editingId === p.id ? (
                  <>
                    <td><input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} style={{padding: '5px'}}/></td>
                    <td><input value={editForm.type} onChange={(e) => setEditForm({...editForm, type: e.target.value})} style={{padding: '5px', width: '100px'}}/></td>
                    <td><input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: parseInt(e.target.value)})} style={{padding: '5px', width: '100px'}}/></td>
                    <td><input type="checkbox" checked={editForm.bestseller} onChange={(e) => setEditForm({...editForm, bestseller: e.target.checked})} /></td>
                    <td style={{textAlign: 'center'}}>
                      <button className="btn btn-accent" onClick={handleSave} style={{padding: '5px 10px', marginRight: '5px'}}><Save size={16}/></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.type}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>{p.bestseller ? "⭐ Có" : "Không"}</td>
                    <td style={{textAlign: 'center'}}>
                      <button className="btn btn-outline" onClick={() => handleEdit(p)} style={{padding: '5px', marginRight: '5px', border: 'none'}}><Edit2 size={18}/></button>
                      <button className="btn btn-outline" onClick={() => handleDelete(p.id)} style={{padding: '5px', border: 'none', color: 'red'}}><Trash2 size={18}/></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>* Lưu ý: Đây là giao diện quản trị frontend dùng cho mục đích demo, dữ liệu sẽ không được lưu vào cở sở dữ liệu sau khi tải lại trang.</p>
    </div>
  );
}
