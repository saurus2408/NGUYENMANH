import React from 'react';

export default function About() {
  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Về Thưởng Trà Quán</h2>
      </div>

      <div className="about-grid">
        <div style={{paddingRight: '2rem'}}>
          <h3 style={{fontSize: '2rem', marginBottom: '1.5rem'}}>Hành Trình Gìn Giữ Hương Trà Việt</h3>
          <p style={{marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-muted)'}}>
            Ra đời từ tình yêu với nền văn hóa thưởng mộc mạc mà tinh tế của người Việt, Thưởng Trà Quán tự hào mang đến những phẩm trà trứ danh từ các vùng trồng chè nổi tiếng thế giới của Việt Nam.
          </p>
          <p style={{marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-muted)'}}>
            Từ Thái Nguyên bạt ngàn với những đồi chè xanh mướt, Mộc Châu bốn mùa sương phủ lãng mạn, đến những cây trà cổ thụ Shan Tuyết hàng trăm năm tuổi tại Hà Giang... Mỗi búp trà chúng tôi chọn lọc đều mang trong mình hơi thở của đất trời và tâm huyết của người nông dân.
          </p>
          <ul style={{marginTop: '2rem'}}>
            <li style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{color: 'var(--accent)'}}>✔</span> Lá trà tươi sạch 100%</li>
            <li style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{color: 'var(--accent)'}}>✔</span> Quy trình chế biến thủ công giữ trọn vị nguyên bản</li>
            <li style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{color: 'var(--accent)'}}>✔</span> Cam kết không chất bảo quản, không hương liệu hóa học</li>
          </ul>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=1200" alt="Vườn Trà" className="about-img" />
        </div>
      </div>

      <div style={{marginTop: '5rem', textAlign: 'center', background: 'var(--primary)', color: 'white', padding: '4rem 2rem', borderRadius: '12px'}}>
        <h3 style={{fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent)'}}>Triết lý của chúng tôi</h3>
        <p style={{fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic'}}>
          "Một chén trà ngon không chỉ là thức uống để giải khát, mà là nhịp cầu kết nối tâm hồn, để vạn vật lắng đọng và thấy lòng tĩnh lặng giữa thế gian ồn ào."
        </p>
      </div>
    </div>
  );
}
