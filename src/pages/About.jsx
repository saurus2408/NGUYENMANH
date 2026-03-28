import React from 'react';

export default function About() {
  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Búp Trà Tuấn Hiền</h2>
      </div>

      <div className="about-grid">
        <div style={{paddingRight: '2rem'}}>
          <h3 style={{fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)'}}>NGƯỜI ĐI TÌM TRÀ NGON NHẤT</h3>
          <div style={{marginBottom: '1rem', fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.9', fontStyle: 'italic'}}>
            <p style={{marginBottom: '0.8rem'}}>Có một người đàn ông dành cả đời đi tìm loại trà ngon nhất.</p>
            <p style={{marginBottom: '0.8rem'}}>
              Ông đi khắp nơi:<br/>
              từ núi cao, rừng sâu,<br/>
              gặp những người làm trà nổi tiếng nhất.
            </p>
            <p style={{marginBottom: '0.8rem'}}>Nhưng ông vẫn không hài lòng.</p>
            <p style={{marginBottom: '0.8rem'}}>
              Một ngày nọ,<br/>
              ông ghé vào một ngôi nhà nhỏ ven đường.<br/>
              Một bà cụ rót cho ông một chén trà.
            </p>
            <p style={{marginBottom: '0.8rem'}}>
              Không phải trà quý.<br/>
              Không phải trà đắt.
            </p>
            <p style={{marginBottom: '0.8rem'}}>
              Nhưng khi uống… ông dừng lại.<br/>
              <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>&ldquo;Đây chính là loại trà tôi tìm cả đời.&rdquo;</span>
            </p>
            <p>
              Bà cụ chỉ cười:<br/>
              <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>&ldquo;Không phải trà ngon hơn…<br/>
              mà là hôm nay ông biết cách uống rồi.&rdquo;</span>
            </p>
          </div>
        </div>
        <div>
          <img src={`${import.meta.env.BASE_URL}cau-chuyen-tra.jpg`} alt="Người đi tìm trà" className="about-img" style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.15)', border: '4px solid white', borderRadius: '15px' }} />
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
