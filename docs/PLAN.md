# PLAN: Tối ưu chức năng thanh toán

## 📋 Mô tả nhiệm vụ
Tối ưu hóa quy trình thanh toán hiện tại (`Checkout.jsx`) để đảm bảo trải nghiệm người dùng (UX) mượt mà, hiệu suất (Performance) tốt hơn khi kiểm tra trạng thái thanh toán và bảo mật (Security) cao hơn.

---

## 🤖 Các Agent tham gia & Vai trò

| Agent | Vai trò |
|-------|---------|
| `project-planner` | Lập kế hoạch, phân chia nhiệm vụ |
| `frontend-specialist` | Tối ưu UI/UX, Validation form, Hiệu ứng chuyển cảnh |
| `backend-specialist` | Tối ưu logic polling (truy vấn theo ID), Cải thiện `supabase.js` |
| `security-auditor` | Kiểm tra bảo mật dữ liệu khách hàng, Sanitize input |
| `test-engineer` | Kiểm tra luồng thanh toán, giả lập trạng thái thanh toán |

---

## 🛠️ Các giai đoạn thực hiện

### Giai đoạn 1: Phân tích & Tối ưu Foundation (`backend-specialist`, `security-auditor`)
1. **Supabase Optimization**: Thêm hàm `getOrderById(id)` vào `supabase.js` để tránh fetch toàn bộ danh sách orders.
2. **Security Audit**: Kiểm tra cách lưu trữ và truyền tải dữ liệu khách hàng. Đảm bảo input được lọc kỹ.
3. **Polling Logic**: Chuyển đổi từ polling toàn bộ sang polling theo `orderId` trong `Checkout.jsx`.

### Giai đoạn 2: Nâng cấp Giao diện & Trải nghiệm (`frontend-specialist`)
1. **Form Validation**: Thêm regex cho số điện thoại, kiểm tra độ dài địa chỉ, hiển thị lỗi trực quan.
2. **UX Flow**: Thêm hiệu ứng "Skeleton loading" hoặc "Progress bar" khi chờ thanh toán.
3. **VietQR Enhancement**: Cải thiện hiển thị QR, thêm nút "Tôi đã chuyển khoản" để trigger check ngay lập tức thay vì chỉ chờ 5s.
4. **Responsive**: Đảm bảo thanh toán trên Mobile cực kỳ dễ dàng.

### Giai đoạn 3: Kiểm thử & Hoàn thiện (`test-engineer`, `any`)
1. **Unit Test**: Test các case nhập liệu sai, case giỏ hàng trống.
2. **Integration Test**: Test luồng đặt hàng -> tạo order -> hiển thị QR -> xác nhận thanh toán.
3. **Performance Check**: Đo lường thời gian phản hồi của polling.
4. **Final Check**: Run `security_scan.py` và `lint_runner.py`.

---

## 📅 KPI Hoàn thành
- [ ] Hàm `getOrderById` được sử dụng thay thế `getOrders().find()`.
- [ ] Không còn lỗi bypass validation form.
- [ ] Giao diện QR chuyên nghiệp hơn, có feedback rõ ràng cho người dùng.
- [ ] Script `security_scan.py` đạt kết quả Pass.

---

## ⏸️ CHECKPOINT: Đang chờ phê duyệt từ người dùng
Vui lòng xem qua kế hoạch trên. Nếu bạn đồng ý, hãy phản hồi "Y" để tôi bắt đầu triển khai các Agent song song.
