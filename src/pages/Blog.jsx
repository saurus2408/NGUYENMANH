import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Tuyệt Kỹ Pha Trà Shan Tuyết Giữ Trọn Hương Vị",
    date: "10 Tháng 10, 2024",
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800",
    excerpt: "Khám phá bí quyết pha trà Shan Tuyết Cổ Thụ ngon chuẩn vị với 5 bước đơn giản giúp đánh thức hương thơm từ núi rừng Tây Bắc."
  },
  {
    id: 2,
    title: "Phân Biệt Trà Xanh, Hồng Trà & Trà Ô Long",
    date: "05 Tháng 10, 2024",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=800",
    excerpt: "Bạn đã từng hoang mang khi lựa chọn các loại trà? Nắm bắt cấp độ lên men chính là chìa khóa để nhận biết sự khác biệt giữa ba loại trà phổ biến này."
  },
  {
    id: 3,
    title: "Lợi Ích Sức Khỏe Tuyệt Vời Của Trà Xanh Mỗi Sáng",
    date: "28 Tháng 09, 2024",
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800",
    excerpt: "Việc bắt đầu ngày mới bằng một tách trà xanh mang lại vô vàn công dụng bất ngờ, từ bảo vệ tim mạch đến chống gốc tự do mạnh mẽ."
  }
];

export default function Blog() {
  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Góc Kiến Thức Trà</h2>
        <p style={{color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto'}}>Những câu chuyện về nguồn cội văn hóa thưởng thức trà, bí quyết chọn, pha trà ngon mà Thưởng Trà Quán muốn gửi gắm tới những tâm hồn đồng điệu.</p>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem'}}>
        {blogPosts.map(post => (
          <div key={post.id} style={{background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', transition: 'var(--transition)'}} className="blog-card">
            <img src={post.image} alt={post.title} style={{width: '100%', height: '220px', objectFit: 'cover'}} />
            <div style={{padding: '1.5rem'}}>
              <span style={{color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold'}}>{post.date}</span>
              <h3 style={{fontSize: '1.3rem', margin: '0.8rem 0', color: 'var(--primary)'}}>{post.title}</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem'}}>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} style={{color: 'var(--primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                Đọc Thêm &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .blog-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
}
