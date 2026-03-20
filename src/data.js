export const products = [
  {
    id: 1,
    name: "Trà Xanh Thái Nguyên Cao Cấp",
    type: "Trà Xanh",
    price: 350000,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?auto=format&fit=crop&q=80&w=800",
    origin: "Thái Nguyên, Việt Nam",
    description: "Trà xanh Thái Nguyên nổi tiếng với hương cốm non đặc trưng, vị chát dịu ban đầu và ngọt hậu sâu lắng. Sản phẩm được hái từ những búp trà non tươi nhất lúc sáng sớm.",
    healthBenefits: [
      "Chống lão hóa hiệu quả",
      "Giảm căng thẳng, mệt mỏi",
      "Hỗ trợ giảm cân và bảo vệ tim mạch"
    ],
    brewing: "Pha với nước 80-85°C. Hãm trà trong 2-3 phút. Có thể pha được 4-5 nước.",
    rating: 4.9,
    reviews: 124,
    bestseller: true
  },
  {
    id: 2,
    name: "Trà Shan Tuyết Cổ Thụ Hà Giang",
    type: "Shan Tuyết",
    price: 850000,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800",
    origin: "Tây Bắc, Việt Nam",
    description: "Những búp trà phủ đầy lông tuyết trắng vươn mình trên vùng núi cao mù sương quanh năm. Vị đậm đà, hương thơm mạnh mẽ của núi rừng thiên nhiên.",
    healthBenefits: [
      "Thanh lọc cơ thể cực tốt",
      "Giàu chất chống oxy hóa",
      "Giúp tinh thần tỉnh táo"
    ],
    brewing: "Pha với nước 90°C. Hãm trà 30 giây đến 1 phút cho nước đầu. Nước sau tăng thời gian dần.",
    rating: 4.8,
    reviews: 89,
    bestseller: false
  },
  {
    id: 3,
    name: "Trà Ô Long Cầu Đất Thượng Hạng",
    type: "Ô Long",
    price: 520000,
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=800",
    origin: "Đà Lạt, Lâm Đồng",
    description: "Trà Ô Long được bán lên men, viên trà tròn đều. Hương thơm nồng nàn của hoa lan, vị tinh tế, ngọt thanh không chát, nước pha màu vàng sóng sánh.",
    healthBenefits: [
      "Giúp tiêu hóa tốt sau bữa ăn",
      "Hỗ trợ giảm cholesterol",
      "Làm đẹp da"
    ],
    brewing: "Pha với nước 90-95°C. Đánh thức trà ở nước đầu, các nước sau hãm 45-60 giây.",
    rating: 5.0,
    reviews: 210,
    bestseller: true
  },
  {
    id: 4,
    name: "Hồng Trà (Trà Đen) Mộc Châu",
    type: "Hồng Trà",
    price: 280000,
    image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=800",
    origin: "Mộc Châu, Sơn La",
    description: "Trà lên men toàn phần mang màu nước đỏ au tuyệt đẹp. Vị ngọt mật ong, thoảng hương hoa quả chín vô cùng quyến rũ.",
    healthBenefits: [
      "Làm ấm cơ thể vào mùa lạnh",
      "Tăng cường tuần hoàn máu",
      "Tốt cho tim mạch"
    ],
    brewing: "Pha với nước sôi 100°C. Hãm trà 3-5 phút tùy sở thích uống đậm hay nhạt.",
    rating: 4.7,
    reviews: 95,
    bestseller: false
  },
  {
    id: 5,
    name: "Trà Hoa Cúc Mật Ong",
    type: "Trà Thảo Mộc",
    price: 220000,
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800",
    origin: "Hưng Yên, Việt Nam",
    description: "Sự kết hợp hoàn hảo giữa hoa cúc tiến vua sấy lạnh và mật ong rừng nguyên chất, mang lại thức uống thanh tao, thư giãn.",
    healthBenefits: [
      "An thần, giúp ngủ sâu giấc",
      "Giải nhiệt, mát gan",
      "Làm sáng mắt"
    ],
    brewing: "Lấy 5-7 bông cúc, pha với 300ml nước 90°C, hãm 5 phút. Thêm mật ong khi nước còn ấm.",
    rating: 4.9,
    reviews: 156,
    bestseller: true
  },
  {
    id: 6,
    name: "Trà Lài Trân Châu Cao Cấp",
    type: "Trà Ướp Hoa",
    price: 320000,
    image: "https://images.unsplash.com/photo-1517487881594-2787f0727c23?auto=format&fit=crop&q=80&w=800",
    origin: "Bảo Lộc, Lâm Đồng",
    description: "Trà xanh đọt non được ướp thủ công với hoa lài tươi hái lúc chập tối. Hương thơm ngào ngạt, tinh thiết đọng mãi nơi cuống họng.",
    healthBenefits: [
      "Thư giãn tinh thần ngay lập tức",
      "Khử mùi hôi miệng",
      "Chống lão hóa tế bào"
    ],
    brewing: "Pha nước 80-85°C. Hãm nhanh 2-3 phút, nhấc bã trà ra để tránh bị đắng cốm.",
    rating: 4.6,
    reviews: 78,
    bestseller: false
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
