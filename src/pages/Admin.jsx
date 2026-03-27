import React, { useState, useEffect } from 'react';
import { formatPrice } from '../data';
import { 
  Edit2, Save, Trash2, Plus, 
  Package, ShoppingCart, MessageSquare, 
  LogOut, CheckCircle, Truck, X, BookOpen
} from 'lucide-react';
import { database, supabase } from '../supabase';
import { products as initialProducts } from '../data';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data State
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  
  // Edit State
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editType, setEditType] = useState('product'); // 'product' or 'blog'

  useEffect(() => {
    const localAuth = localStorage.getItem('adminAuth') === 'true';
    if (localAuth) {
      setIsAuthenticated(true);
      fetchData();
    } else {
        setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [p, o, c, b] = await Promise.all([
        database.getProducts(),
        database.getOrders(),
        database.getContacts(),
        database.getBlogPosts()
      ]);
      
      setProducts(p);
      setOrders(o);
      setContacts(c);
      setBlogPosts(b);
    } catch (err) {
      console.log("Database fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if ((email === 'admin' || email === 'admin@thuongtra.vn') && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchData();
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  // Product Actions
  const openEditForm = (item, type = 'product') => {
    setEditType(type);
    setEditForm({ ...item });
    setShowEditForm(true);
  };

  const handleSave = async () => {
    try {
      const { id, created_at, ...updates } = editForm;
      if (editType === 'product') {
        let finalUpdates = { ...updates };
        if (typeof updates.health_benefits === 'string') {
          finalUpdates.health_benefits = updates.health_benefits.split('\n').filter(b => b.trim() !== '');
        }
        await database.updateProduct(id, finalUpdates);
        setProducts(products.map(p => p.id === id ? { ...p, ...finalUpdates } : p));
      } else {
        await database.updateBlogPost(id, updates);
        setBlogPosts(blogPosts.map(b => b.id === id ? { ...b, ...updates } : b));
      }
      setShowEditForm(false);
      alert('Đã cập nhật thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        if (type === 'product') {
          await database.deleteProduct(id);
          setProducts(products.filter(p => p.id !== id));
        } else {
          await database.deleteBlogPost(id);
          setBlogPosts(blogPosts.filter(b => b.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: 'Sản phẩm mới',
      type: 'Chè',
      price: 250000,
      stock: 100,
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?auto=format&fit=crop&q=80&w=800",
      description: 'Mô tả chi tiết...',
      origin: 'Hà Giang',
      bestseller: false,
      brewing: '85-90°C',
      health_benefits: [],
      rating: 5.0,
      reviews: 0
    };
    try {
      const added = await database.addProduct(newProduct);
      setProducts([added, ...products]);
      openEditForm(added, 'product');
    } catch (err) { alert(err.message); }
  };

  const handleAddBlog = async () => {
    const newBlog = {
      title: 'Kiến thức trà mới',
      image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Mô tả ngắn gọn về bài viết...',
      content: 'Nội dung chi tiết bài viết ở đây...',
      author: 'Thưởng Trà Quán'
    };
    try {
      const added = await database.addBlogPost(newBlog);
      setBlogPosts([added, ...blogPosts]);
      openEditForm(added, 'blog');
    } catch (err) { alert(err.message); }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{paddingTop: '5rem', paddingBottom: '10rem', display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px'}}>
            <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🍵</div>
                <h2 style={{fontSize: '20px'}}>Quản Trị Quán</h2>
                <p style={{color: '#888'}}>Đăng nhập hệ thống Supabase</p>
            </div>
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <label>Tài khoản:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin" style={{padding: '12px', border: '1px solid #ddd', borderRadius: '10px'}} required/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <label>Mật khẩu:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin123" style={{padding: '12px', border: '1px solid #ddd', borderRadius: '10px'}} required/>
            </div>
            {loginError && <p style={{color: '#d32f2f', textAlign: 'center'}}>{loginError}</p>}
            <button type="submit" className="btn btn-primary" style={{padding: '12px', borderRadius: '10px'}}>ĐĂNG NHẬP</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '7rem'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: '8px', background: '#f5f5f5', padding: '10px', borderRadius: '15px', overflowX: 'auto'}}>
          <button onClick={() => setActiveTab('products')} style={{padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'products' ? 'var(--primary)' : 'transparent', color: activeTab === 'products' ? 'white' : 'black', cursor: 'pointer', whiteSpace: 'nowrap'}}><Package size={18} style={{verticalAlign: 'middle', marginRight: '5px'}}/> Sản Phẩm</button>
          <button onClick={() => setActiveTab('blog')} style={{padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'blog' ? 'var(--primary)' : 'transparent', color: activeTab === 'blog' ? 'white' : 'black', cursor: 'pointer', whiteSpace: 'nowrap'}}><BookOpen size={18} style={{verticalAlign: 'middle', marginRight: '5px'}}/> Kiến thức trà</button>
          <button onClick={() => setActiveTab('orders')} style={{padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'orders' ? 'var(--primary)' : 'transparent', color: activeTab === 'orders' ? 'white' : 'black', cursor: 'pointer', whiteSpace: 'nowrap'}}><ShoppingCart size={18} style={{verticalAlign: 'middle', marginRight: '5px'}}/> Đơn Hàng</button>
          <button onClick={() => setActiveTab('contacts')} style={{padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'contacts' ? 'var(--primary)' : 'transparent', color: activeTab === 'contacts' ? 'white' : 'black', cursor: 'pointer', whiteSpace: 'nowrap'}}><MessageSquare size={18} style={{verticalAlign: 'middle', marginRight: '5px'}}/> Liên Hệ</button>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{borderRadius: '10px', color: '#dc3545', borderColor: '#dc3545'}}><LogOut size={18}/></button>
      </div>

      {loading ? <div style={{textAlign: 'center', padding: '5rem'}}>Đang tải dữ liệu Supabase...</div> : (
        <>
          {activeTab === 'products' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
                <h2>Kho Sản Phẩm</h2>
                <button className="btn btn-primary" onClick={handleAddProduct} style={{borderRadius: '10px'}}><Plus size={18}/> Thêm Mới</button>
              </div>
              <div style={{background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'}}>
                <table className="cart-table" style={{width: '100%'}}>
                  <thead>
                    <tr style={{background: 'var(--primary)', color: 'white'}}>
                      <th>Ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Kho</th>
                      <th>Sửa/Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td style={{padding: '1rem'}}><img src={p.image} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px'}} /></td>
                        <td><strong>{p.name}</strong><br/><small style={{color: '#999'}}>{p.type}</small></td>
                        <td style={{color: 'var(--accent)', fontWeight: 'bold'}}>{formatPrice(p.price)}</td>
                        <td>{p.stock}</td>
                        <td>
                          <button onClick={() => openEditForm(p, 'product')} style={{background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px'}}><Edit2 size={18} color="var(--primary)"/></button>
                          <button onClick={() => handleDelete(p.id, 'product')} style={{background: 'none', border: 'none', cursor: 'pointer'}}><Trash2 size={18} color="#dc3545"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
                <h2>Quản lý Kiến thức Trà</h2>
                <button className="btn btn-primary" onClick={handleAddBlog} style={{borderRadius: '10px'}}><Plus size={18}/> Viết bài mới</button>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem'}}>
                {blogPosts.map(post => (
                  <div key={post.id} style={{background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'}}>
                    <img src={post.image} style={{width: '100%', height: '150px', objectFit: 'cover'}} />
                    <div style={{padding: '1.2rem'}}>
                      <h4 style={{marginBottom: '0.5rem', height: '3rem', overflow: 'hidden'}}>{post.title}</h4>
                      <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                         <button onClick={() => openEditForm(post, 'blog')} className="btn-icon"><Edit2 size={16}/></button>
                         <button onClick={() => handleDelete(post.id, 'blog')} className="btn-icon" style={{color: '#dc3545'}}><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{marginBottom: '2rem'}}>Đơn Hàng Mới</h2>
              <div style={{display: 'grid', gap: '1rem'}}>
                {orders.length === 0 ? <p>Chưa có đơn hàng nào.</p> : orders.map(o => (
                  <div key={o.id} style={{background: 'white', padding: '1.5rem', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'}}>
                    <div>
                      <strong>{o.name}</strong> - <span>{o.phone}</span>
                      <p style={{margin: '5px 0', fontSize: '0.85rem', color: '#666'}}>{o.address}</p>
                      <p style={{fontSize: '0.8rem', color: '#999'}}>Món đã đặt: {o.items?.map(it => `${it.name} (x${it.quantity})`).join(', ')}</p>
                      <span style={{fontSize: '0.75rem', padding: '3px 8px', borderRadius: '5px', background: o.status === 'paid' ? '#e8f5e9' : '#fff3e0', color: o.status === 'paid' ? '#2e7d32' : '#ef6c00'}}>
                        {o.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                      </span>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{color: 'var(--accent)', fontWeight: 'bold'}}>{formatPrice(o.total)}</p>
                      <div style={{display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'flex-end'}}>
                         {o.status === 'pending' && <button className="btn-icon" onClick={() => database.updateOrderStatus(o.id, 'shipping')}><Truck size={18}/></button>}
                         {o.status !== 'completed' && <button className="btn-icon" onClick={() => database.updateOrderStatus(o.id, 'completed')}><CheckCircle size={18}/></button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
             <div>
               <h2 style={{marginBottom: '2rem'}}>Phản Hồi Khách Hàng</h2>
               <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem'}}>
                  {contacts.map(c => (
                    <div key={c.id} style={{background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'}}>
                      <strong style={{color: 'var(--primary)'}}>{c.name}</strong>
                      <p style={{fontStyle: 'italic', margin: '10px 0'}}>"{c.message}"</p>
                      <p style={{fontSize: '0.8rem', color: '#999'}}>{c.email}</p>
                    </div>
                  ))}
               </div>
             </div>
          )}
        </>
      )}

      {showEditForm && editForm && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: 'white', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px', padding: '2.5rem', position: 'relative'}}>
            <button onClick={() => setShowEditForm(false)} style={{position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer'}}><X size={24}/></button>
            <h3 style={{marginBottom: '2rem'}}>{editType === 'product' ? 'Chỉnh Sửa Sản Phẩm' : 'Chỉnh Sửa Bài Viết'}</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
               {editType === 'product' ? (
                 <>
                   <div className="form-group"><label>Tên:</label><input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group"><label>Loại:</label><select value={editForm.type} onChange={(e) => setEditForm({...editForm, type: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}><option value="Chè">Chè</option><option value="Kẹo Lạc">Kẹo Lạc</option></select></div>
                   <div className="form-group"><label>Giá (VNĐ):</label><input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: parseInt(e.target.value)})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group"><label>Tồn kho:</label><input type="number" value={editForm.stock} onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>URL Ảnh:</label><input value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Mô tả:</label><textarea value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '80px'}} /></div>
                 </>
               ) : (
                 <>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Tiêu đề bài viết:</label><input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Ảnh đại diện (URL):</label><input value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Mô tả ngắn (Excerpt):</label><textarea value={editForm.excerpt} onChange={(e) => setEditForm({...editForm, excerpt: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '60px'}} /></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Nội dung chi tiết:</label><textarea value={editForm.content} onChange={(e) => setEditForm({...editForm, content: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '200px'}} /></div>
                 </>
               )}
            </div>

            <div style={{marginTop: '2.5rem', display: 'flex', gap: '15px'}}>
               <button onClick={handleSave} className="btn btn-primary" style={{flex: 1, padding: '15px', borderRadius: '12px'}}>LƯU LẠI</button>
               <button onClick={() => setShowEditForm(false)} className="btn btn-outline" style={{flex: 1, padding: '15px', borderRadius: '12px'}}>HỦY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
