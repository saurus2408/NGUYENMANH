# PLAN: Refactor Giao diện & Tái cấu trúc Hệ thống

## 📋 Mô tả nhiệm vụ
Tái cấu trúc (Refactor) toàn bộ mã nguồn frontend để tăng khả năng bảo trì, mở rộng mà vẫn **giữ nguyên Style (phong cách), Màu sắc (Palette) và Logo** của "Búp Trà Tuấn Hiền".

---

## 🤖 Các Agent tham gia & Vai trò

| Agent | Vai trò | Trực thuộc |
|-------|---------|------------|
| `project-planner` | Lập kế hoạch phân rã component | `orchestrate` |
| `frontend-specialist` | Tái cấu trúc JSX/CSS, Tách file | `frontend-design` |
| `clean-code` | Đảm bảo mã nguồn gọn gàng, chuẩn SRP | `clean-code` |
| `performance-optimizer` | Tối ưu hóa render & image loading | `performance-profiling` |
| `test-engineer` | Chạy Lint và kiểm tra luồng hoạt động | `testing-patterns` |

---

## 🛠️ Các giai đoạn thực hiện

### Giai đoạn 1: Phân rã Component Layout (`project-planner`, `clean-code`)
1. **Tách Header & Footer**: Chuyển các component này từ `App.jsx` sang các file riêng biệt trong `src/components/`.
2. **Component Hóa Common UI**:
   - `SectionTitle.jsx`: Tiêu đề từng phần.
   - `ProductCard.jsx`: Thẻ sản phẩm dùng chung cho Home & Products.
   - `PaymentOption.jsx`: Tách riêng các option thanh toán.
   - `PromoPopup.jsx`: (Đã có, cần kiểm tra lại).

### Giai đoạn 2: Tối ưu hóa CSS & Inline Styles (`frontend-specialist`)
1. **Utility & Component CSS**: Chuyển các inline styles lặp đi lặp lại sang các class trong `index.css`.
2. **CSS Variables**: Triệt để sử dụng các biến `--primary`, `--accent` để đảm bảo tính nhất quán nếu sau này muốn thay đổi theme.
3. **BEM-ish naming**: Áp dụng quy tắc đặt tên class để code CSS trong `index.css` dễ đọc hơn.

### Giai đoạn 3: Phân tán Logic Trang (`frontend-specialist`)
1. **App.jsx Clean-up**: Rút gọn file `App.jsx`, chỉ để lại Routing và cấu trúc Layout chính.
2. **Page Logic Isolation**: Chuyển các logic xử lý dữ liệu (fetchProducts, cart logic...) sang các hook hoặc file chuyên biệt nếu cần thiết.

### Giai đoạn 4: Hoàn thiện & Kiểm thử (`test-engineer`)
1. **Linting Check**: Fix toàn bộ các lỗi Lint (bao gồm 9 lỗi đã được phát hiện ở bước trước).
2. **Responsive Check**: Đảm bảo sau khi refactor, giao diện vẫn chuẩn trên Mobile (breakpoints).
3. **Final Audit**: Chạy `checklist.py`.

---

## 📅 KPI Hoàn thành
- [ ] Số dòng code trong `App.jsx` giảm ít nhất 50%.
- [ ] Không còn inline styles trùng lặp trong ProductDetail hay Checkout.
- [ ] 100% các lỗi Lint hiện tại được xử lý.
- [ ] Giữ nguyên cảm giác "Trà Búp Tuấn Hiền" hiện tại (Trải nghiệm người dùng không bị sốc).

---

## ⏸️ CHECKPOINT: Xác nhận triển khai
Kế hoạch này sẽ thay đổi khá nhiều file (multi-file restructure).
Nếu bạn đồng ý, hãy phản hồi **"Y"** để tôi thực hiện theo đúng triết lý của `@[orchestrate]`.
