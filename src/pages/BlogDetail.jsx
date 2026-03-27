import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { database } from '../supabase';
import { ChevronLeft, Calendar, User } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await database.getBlogPosts();
        // Since we don't have a getBlogPostById, we filter from all for now or I can add it
        const found = posts.find(p => p.id.toString() === id);
        setPost(found);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
  };

  if (loading) return <div className="container" style={{padding: '10rem 0', textAlign: 'center'}}>Đang tải bài viết...</div>;

  if (!post) {
    return (
      <div className="container" style={{padding: '10rem 0', textAlign: 'center'}}>
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/blog" className="btn btn-primary" style={{marginTop: '2rem'}}>Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '7rem'}}>
      <Link to="/blog" style={{display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', marginBottom: '2rem', fontWeight: 'bold'}}>
        <ChevronLeft size={20} /> Quay lại danh sách
      </Link>

      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <img src={post.image} alt={post.title} style={{width: '100%', height: '450px', objectFit: 'cover', borderRadius: '20px', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
        
        <div style={{display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: '#888', fontSize: '0.9rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Calendar size={16}/> {formatDate(post.created_at)}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><User size={16}/> {post.author || 'Thưởng Trà Quán'}</div>
        </div>

        <h1 style={{fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)', lineHeight: '1.3'}}>{post.title}</h1>
        
        <div style={{fontSize: '1.2rem', color: '#555', lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>
          {post.content}
        </div>
      </div>
    </div>
  );
}
