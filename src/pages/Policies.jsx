import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Policies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'shipping';
  
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem'}}>
      <div className="section-title">
        <h2>Chính Sách Khách Hàng</h2>
      </div>

      <div style={{display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: '2rem'}}>
        <button 
          className={`policy-tab ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          Giao Hàng
        </button>
        <button 
          className={`policy-tab ${activeTab === 'return' ? 'active' : ''}`}
          onClick={() => setActiveTab('return')}
        >
          Đổi Trả
        </button>
        <button 
          className={`policy-tab ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Bảo Mật
        </button>
      </div>

      <div style={{background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
        {activeTab === 'shipping' && (
          <div>
            <h3>Chính Sách Giao Hàng</h3>
            <p>Chúng tôi cam kết mang những sản phẩm trà chất lượng nhất đến tận tay bạn với thời gian nhanh chóng và chi phí tối ưu.</p>
            <ul>
              <li><strong>Phạm vi giao hàng:</strong> Toàn quốc (Việt Nam)</li>
              <li><strong>Thời gian giao hàng:</strong>
                <ul>
                  <li>Nội thành Hà Nội & TP.HCM: 1-2 ngày làm việc.</li>
                  <li>Các tỉnh thành khác: 3-5 ngày làm việc.</li>
                </ul>
              </li>
              <li><strong>Phí vận chuyển:</strong> 
                <ul>
                  <li>Đồng giá 30.000đ cho mọi đơn hàng.</li>
                  <li><strong>Miễn phí</strong> vận chuyển cho đơn hàng từ 500.000đ trở lên.</li>
                </ul>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'return' && (
          <div>
            <h3>Chính Sách Đổi Trả Sản Phẩm</h3>
            <p>Sự hài lòng của bạn trong từng trải nghiệm thưởng trà là ưu tiên hàng đầu của chúng tôi.</p>
            <ul>
              <li><strong>Thời gian đổi trả:</strong> Trong vòng 7 ngày kể từ ngày nhận hàng.</li>
              <li><strong>Điều kiện đổi trả:</strong>
                <ul>
                  <li>Sản phẩm còn nguyên tem mác, chưa qua bóc mở sử dụng.</li>
                  <li>Sản phẩm bị lỗi do quá trình đóng gói hoặc vận chuyển (vui lòng cung cấp video/hình ảnh mở hộp).</li>
                </ul>
              </li>
              <li><strong>Quy trình hoàn tiền:</strong> Hoàn tiền 100% giá trị sản phẩm qua chuyển khoản ngân hàng trong vòng 3-5 ngày sau khi nhận và kiểm tra hàng hoàn.</li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <h3>Chính Sách Bảo Mật Thông Tin</h3>
            <p>Thưởng Trà Quán tôn trọng và cam kết bảo vệ dữ liệu cá nhân của khách hàng.</p>
            <ul>
              <li><strong>Mục đích thu thập:</strong> Chỉ sử dụng thông tin (tên, SĐT, địa chỉ, email) để xử lý đơn hàng, hỗ trợ sau bán hàng và cung cấp tin tức khuyến mãi nếu bạn đồng ý.</li>
              <li><strong>Cam kết bảo mật:</strong> Không bán, chia sẻ hay trao đổi thông tin khách hàng cho bất kỳ bên thứ ba nào ngoài đơn vị vận chuyển đối tác.</li>
              <li><strong>Thời gian lưu trữ:</strong> Dữ liệu được lưu trữ trên hệ thống máy chủ bảo mật của chúng tôi hoặc cho đến khi khách hàng có yêu cầu hủy bỏ.</li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        .policy-tab {
          padding: 1rem 2rem;
          background: transparent;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
          transition: var(--transition);
        }
        .policy-tab.active {
          color: var(--primary);
        }
        .policy-tab.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary);
        }
        .policy-tab:hover:not(.active) {
          color: var(--text-main);
        }
        ul {
          margin-top: 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        li {
          margin-bottom: 0.8rem;
          line-height: 1.8;
        }
        h3 {
          margin-bottom: 1.5rem;
          color: var(--accent);
          font-size: 1.5rem;
        }
        p {
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
