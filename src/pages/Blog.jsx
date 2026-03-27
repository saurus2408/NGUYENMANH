import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../supabase';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await database.getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
  };

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Góc Kiến Thức Trà</h2>
        <p style={{color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto'}}>Những câu chuyện về nguồn cội văn hóa thưởng thức trà, bí quyết chọn, pha trà ngon mà Thưởng Trà Quán muốn gửi gắm tới những tâm hồn đồng điệu.</p>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '5rem'}}>Đang tải kiến thức trà...</div>
      ) : posts.length === 0 ? (
        <div style={{textAlign: 'center', padding: '5rem', color: '#888'}}>Đang cập nhật thêm kiến thức về trà. Vui lòng quay lại sau.</div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem'}}>
          {posts.map(post => (
            <div key={post.id} style={{background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', transition: 'var(--transition)'}} className="blog-card">
              <img src={post.image} alt={post.title} style={{width: '100%', height: '220px', objectFit: 'cover'}} />
              <div style={{padding: '1.5rem'}}>
                <span style={{color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold'}}>{post.date || formatDate(post.created_at)}</span>
                <h3 style={{fontSize: '1.3rem', margin: '0.8rem 0', color: 'var(--primary)'}}>{post.title}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem'}}>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} style={{color: 'var(--primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                  Đọc Thêm &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .blog-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
}
