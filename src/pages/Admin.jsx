import React, { useState, useEffect } from 'react';
import { formatPrice } from '../data';
import { 
  Edit2, Save, Trash2, Plus, 
  Package, ShoppingCart, MessageSquare, 
  LogOut, CheckCircle, Truck, X, BookOpen, Star
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
  const [promotions, setPromotions] = useState([]);
  
  // Edit State
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editType, setEditType] = useState('product'); // 'product', 'blog', or 'promo'

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
      const [p, o, c, b, pr] = await Promise.all([
        database.getProducts(),
        database.getOrders(),
        database.getContacts(),
        database.getBlogPosts(),
        database.getPromotions().catch(() => [])
      ]);
      
      setProducts(p);
      setOrders(o);
      setContacts(c);
      setBlogPosts(b);
      setPromotions(pr);
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
      } else if (editType === 'blog') {
        await database.updateBlogPost(id, updates);
        setBlogPosts(blogPosts.map(b => b.id === id ? { ...b, ...updates } : b));
      } else if (editType === 'promo') {
        await database.updatePromotion(id, updates);
        setPromotions(promotions.map(p => p.id === id ? { ...p, ...updates } : p));
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
        } else if (type === 'blog') {
          await database.deleteBlogPost(id);
          setBlogPosts(blogPosts.filter(b => b.id !== id));
        } else if (type === 'promo') {
          await database.deletePromotion(id);
          setPromotions(promotions.filter(p => p.id !== id));
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
      origin: 'Thái Nguyên',
      bestseller: false,
      originalPrice: 300000,
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadingAlert = alert('Đang tải ảnh lên... Vui lòng không đóng cửa sổ.');
    try {
      // Create safe filename
      const fileExt = file.name.split('.').pop();
      const fileName = `product_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Giả sử họ dùng bucket tên "images" (phổ biến)
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      setEditForm(prev => ({ ...prev, image: data.publicUrl }));
      alert('Tải ảnh thành công!');
    } catch (err) {
      console.error(err);
      alert('Lỗi tải ảnh: Bạn đã tạo Bucket "images" và set quyền Public ở Supabase chưa? Lỗi chi tiết: ' + err.message);
    }
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

  const handleAddPromo = async () => {
    const newPromo = {
      title: 'Khuyến Mãi Mới',
      description: 'Mô tả chương trình...',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
      badge: 'Giảm 20%',
      is_active: false
    };
    try {
      const added = await database.addPromotion(newPromo);
      setPromotions([added, ...promotions]);
      openEditForm(added, 'promo');
    } catch (err) { 
      alert("Lỗi: Bạn cần tạo bảng 'promotions' trong Supabase SQL Editor trước nhé! Vui lòng làm theo hướng dẫn màu xanh ở màn hình chat."); 
    }
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
          <button onClick={() => setActiveTab('promos')} style={{padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'promos' ? 'var(--primary)' : 'transparent', color: activeTab === 'promos' ? 'white' : 'black', cursor: 'pointer', whiteSpace: 'nowrap'}}><Star size={18} style={{verticalAlign: 'middle', marginRight: '5px'}}/> Quảng Cáo Popup</button>
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

          {activeTab === 'promos' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
                <h2 style={{color: 'var(--primary)'}}>Quản lý Quảng Cáo Popup</h2>
                <button className="btn btn-primary" onClick={handleAddPromo} style={{borderRadius: '10px'}}><Plus size={18}/> Tạo Mẫu Mới</button>
              </div>
              <p style={{marginBottom: '20px', color: '#666'}}>Chỉ hiển thị 1 mẫu Quảng cáo được bật (Active) tại Trang Chủ.</p>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem'}}>
                {promotions.map(promo => (
                  <div key={promo.id} style={{background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', border: promo.is_active ? '2px solid var(--primary)' : '2px solid transparent'}}>
                    <div style={{position: 'relative'}}>
                      <img src={promo.image} style={{width: '100%', height: '150px', objectFit: 'cover', opacity: promo.is_active ? 1 : 0.6}} />
                      {promo.is_active && <span style={{position: 'absolute', top: '10px', left: '10px', background: 'var(--accent)', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold'}}>ĐANG HIỂN THỊ</span>}
                    </div>
                    <div style={{padding: '1.2rem', opacity: promo.is_active ? 1 : 0.6}}>
                      <h4 style={{marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--primary)'}}>{promo.title}</h4>
                      <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '10px'}}>{promo.badge}</p>
                      <button 
                        onClick={async () => {
                           try {
                             if (!promo.is_active) {
                               // Tat ca cac muc khac
                               await Promise.all(promotions.filter(p => p.is_active).map(p => database.updatePromotion(p.id, { is_active: false })));
                             }
                             await database.updatePromotion(promo.id, { is_active: !promo.is_active });
                             setPromotions(promotions.map(p => p.id === promo.id ? { ...p, is_active: !promo.is_active } : (promo.is_active ? p : { ...p, is_active: false })));
                           } catch (err) { alert('Lỗi: ' + err.message); }
                        }}
                        style={{width: '100%', padding: '10px', borderRadius: '8px', border: promo.is_active ? '1px solid #ddd' : 'none', background: promo.is_active ? '#f5f5f5' : 'var(--primary)', color: promo.is_active ? '#333' : 'white', cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold'}}
                      >
                         {promo.is_active ? 'TẮT HIỂN THỊ' : 'CHỌN HIỂN THỊ'}
                      </button>
                      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', borderTop: '1px solid #eee', paddingTop: '15px'}}>
                         <button onClick={() => openEditForm(promo, 'promo')} className="btn-icon" style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Edit2 size={16}/> Sửa</button>
                         <button onClick={() => handleDelete(promo.id, 'promo')} className="btn-icon" style={{color: '#dc3545', display: 'flex', alignItems: 'center', gap: '5px'}}><Trash2 size={16}/> Xóa</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{marginBottom: '2rem'}}>Quản Lý Đơn Hàng</h2>
              <div style={{display: 'grid', gap: '1rem'}}>
                {orders.length === 0 ? <p>Chưa có đơn hàng nào.</p> : orders.map(o => (
                  <div key={o.id} style={{background: 'white', padding: '1.5rem', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'}}>
                    <div>
                      <strong>{o.name}</strong> - <span style={{color: 'var(--primary)', fontWeight: 600}}>{o.phone}</span>
                      <p style={{margin: '5px 0', fontSize: '0.85rem', color: '#666'}}>{o.address}</p>
                      <p style={{fontSize: '0.85rem', color: '#444'}}>Món đã đặt: <strong>{o.items?.map(it => `${it.name} (x${it.quantity})`).join(', ')}</strong></p>
                      <div style={{marginTop: '8px', display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', background: o.payment_mode === 'bank_transfer' ? '#e3f2fd' : '#fff3e0', color: o.payment_mode === 'bank_transfer' ? '#1976d2' : '#f57c00'}}>
                        {o.payment_mode === 'bank_transfer' ? '💳 Yêu cầu TT Qua Ngân hàng' : '💵 Yêu cầu TT Trực tiếp (COD)'}
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '10px'}}>{formatPrice(o.total)}</p>
                      <div style={{display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end'}}>
                         <select 
                           value={o.status || 'pending'} 
                           onChange={async (e) => {
                             const newStatus = e.target.value;
                             try {
                               await database.updateOrderStatus(o.id, newStatus);
                               setOrders(orders.map(order => order.id === o.id ? { ...order, status: newStatus } : order));
                             } catch (err) { alert('Lỗi cập nhật: ' + err.message); }
                           }}
                           style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none', background: '#f8f9fa', cursor: 'pointer', fontWeight: 600, color: 'var(--primary)' }}
                         >
                           <option value="pending">⏳ Chờ xử lý</option>
                           <option value="paid">✅ Đã nhận tiền (Bank)</option>
                           <option value="confirmed">📦 Đã xác nhận đơn</option>
                           <option value="shipping">🚚 Đang vận chuyển</option>
                           <option value="shipped">🎉 Giao thành công</option>
                         </select>
                         <button 
                           onClick={async () => {
                             if(window.confirm('Xác nhận xóa vĩnh viễn đơn hàng này?')) {
                               try {
                                 await database.deleteOrder(o.id);
                                 setOrders(orders.filter(order => order.id !== o.id));
                               } catch (err) { alert('Lỗi xóa: ' + err.message); }
                             }
                           }} 
                           style={{ border: 'none', background: '#ffeeee', color: '#dc3545', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                           title="Xóa đơn"
                         >
                           <Trash2 size={16}/>
                         </button>
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
                   <div className="form-group"><label>Giá gốc (VNĐ):</label><input type="number" value={editForm.originalPrice || ''} onChange={(e) => setEditForm({...editForm, originalPrice: parseInt(e.target.value)})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}} placeholder="Ví dụ: 300000"/></div>
                   <div className="form-group"><label>Giá bán (VNĐ):</label><input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: parseInt(e.target.value)})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group"><label>Tồn kho:</label><input type="number" value={editForm.stock} onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group"><label>Nguồn gốc:</label><input value={editForm.origin || 'Thái Nguyên'} onChange={(e) => setEditForm({...editForm, origin: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2', display: 'flex', alignItems: 'center', gap: '10px', background: '#f5fff5', padding: '12px 15px', borderRadius: '8px', border: '1px dashed var(--primary)'}}>
                     <input type="checkbox" checked={editForm.bestseller || false} onChange={(e) => setEditForm({...editForm, bestseller: e.target.checked})} style={{width: '22px', height: '22px', accentColor: 'var(--primary)', cursor: 'pointer'}} id="bestseller-check" />
                     <label htmlFor="bestseller-check" style={{fontWeight: 'bold', color: 'var(--primary)', cursor: 'pointer', margin: 0}}>🌟 Đánh dấu "Sản phẩm nổi bật" (Sẽ hiện ra ngoài Trang Chủ)</label>
                   </div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}>
                     <label>Upload Ảnh (từ Máy Tính):</label>
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                       <input type="file" accept="image/*" onChange={handleImageUpload} style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9'}}/>
                       <input value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Hoặc sửa URL ảnh" style={{flex: 2, padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/>
                       {editForm.image && <img src={editForm.image} alt="preview" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px'}} />}
                     </div>
                   </div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Mô tả:</label><textarea value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '80px'}} /></div>
                 </>
               ) : editType === 'blog' ? (
                 <>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Tiêu đề bài viết:</label><input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}>
                     <label>Upload Ảnh (từ Máy Tính):</label>
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                       <input type="file" accept="image/*" onChange={handleImageUpload} style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9'}}/>
                       <input value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Hoặc sửa URL ảnh" style={{flex: 2, padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/>
                       {editForm.image && <img src={editForm.image} alt="preview" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px'}} />}
                     </div>
                   </div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Mô tả ngắn (Excerpt):</label><textarea value={editForm.excerpt} onChange={(e) => setEditForm({...editForm, excerpt: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '60px'}} /></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Nội dung chi tiết:</label><textarea value={editForm.content} onChange={(e) => setEditForm({...editForm, content: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '200px'}} /></div>
                 </>
               ) : editType === 'promo' ? (
                 <>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Tiêu đề siêu to:</label><input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group"><label>Nhãn dán góc ảnh (VD: Ưu đãi 50%):</label><input value={editForm.badge} onChange={(e) => setEditForm({...editForm, badge: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/></div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}>
                     <label>Upload Ảnh Banner:</label>
                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                       <input type="file" accept="image/*" onChange={handleImageUpload} style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9'}}/>
                       <input value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} placeholder="Hoặc dán URL" style={{flex: 2, padding: '10px', border: '1px solid #ddd', borderRadius: '8px'}}/>
                       {editForm.image && <img src={editForm.image} alt="preview" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px'}} />}
                     </div>
                   </div>
                   <div className="form-group" style={{gridColumn: '1 / span 2'}}><label>Lời mời gọi hấp dẫn (Mô tả):</label><textarea value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '120px'}} /></div>
                 </>
               ) : null}
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
