// Types for mock data
export interface IFeaturedProduct {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  rating: number
  reviews: number
  discount: string
}

export interface IBenefit {
  title: string
  description: string
  image: string
}

export interface ITestimonial {
  name: string
  role: string
  avatar: string
  comment: string
  rating: number
}

export interface IWorkStep {
  step: string
  title: string
  desc: string
}

// Mock data
export const featuredProducts: IFeaturedProduct[] = [
  {
    id: 1,
    name: "Áo thun cotton cao cấp",
    price: "299,000",
    originalPrice: "450,000",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 234,
    discount: "34%",
  },
  {
    id: 2,
    name: "Túi xách da thời trang",
    price: "599,000",
    originalPrice: "890,000",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 156,
    discount: "33%",
  },
  {
    id: 3,
    name: "Giày sneaker nam nữ",
    price: "750,000",
    originalPrice: "1,200,000",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 89,
    discount: "37%",
  },
  {
    id: 4,
    name: "Đồng hồ thông minh",
    price: "1,299,000",
    originalPrice: "2,100,000",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    rating: 4.9,
    reviews: 312,
    discount: "38%",
  },
  {
    id: 5,
    name: "Tai nghe không dây",
    price: "599,000",
    originalPrice: "899,000",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop&crop=center",
    rating: 4.6,
    reviews: 189,
    discount: "33%",
  },
  {
    id: 6,
    name: "Máy ảnh mini",
    price: "1,899,000",
    originalPrice: "2,799,000",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&crop=center",
    rating: 4.8,
    reviews: 267,
    discount: "32%",
  },
  {
    id: 7,
    name: "Kính mát thời trang",
    price: "299,000",
    originalPrice: "499,000",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&crop=center",
    rating: 4.5,
    reviews: 145,
    discount: "40%",
  },
  {
    id: 8,
    name: "Ốp lưng điện thoại",
    price: "99,000",
    originalPrice: "199,000",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop&crop=center",
    rating: 4.7,
    reviews: 422,
    discount: "50%",
  },
]

export const benefits: IBenefit[] = [
  {
    title: "Nhập khẩu trực tiếp",
    description:
      "Kết nối trực tiếp với nhà cung cấp Taobao/1688, đảm bảo giá gốc tốt nhất",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  },
  {
    title: "Giá cạnh tranh",
    description:
      "Tiết kiệm 30-50% so với mua trong nước nhờ nguồn hàng trực tiếp",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
  },
  {
    title: "Đảm bảo chất lượng",
    description: "Kiểm tra chất lượng kỹ lưỡng trước khi gửi hàng về Việt Nam",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
  },
  {
    title: "Vận chuyển nhanh",
    description: "Giao hàng tận nơi trong 7-10 ngày, đóng gói cẩn thận",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  },
]

export const workSteps: IWorkStep[] = [
  {
    step: "01",
    title: "Tìm sản phẩm",
    desc: "Gửi link hoặc hình ảnh sản phẩm bạn muốn mua",
  },
  {
    step: "02",
    title: "Báo giá",
    desc: "Chúng tôi báo giá chi tiết bao gồm phí vận chuyển",
  },
  {
    step: "03",
    title: "Thanh toán",
    desc: "Thanh toán đặt cọc và chúng tôi tiến hành đặt hàng",
  },
  {
    step: "04",
    title: "Nhận hàng",
    desc: "Nhận hàng tại nhà và thanh toán số tiền còn lại",
  },
]

export const testimonials: ITestimonial[] = [
  {
    name: "Nguyễn Văn A",
    role: "Chủ shop thời trang",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment:
      "Dịch vụ tuyệt vời! Hàng về nhanh, giá rẻ, chất lượng tốt. Đã order nhiều lần và luôn hài lòng.",
    rating: 5,
  },
  {
    name: "Trần Thị B",
    role: "Người mua sắm cá nhân",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment:
      "Tư vấn nhiệt tình, hỗ trợ đặt hàng chi tiết. Rất recommend cho ai muốn mua hàng Taobao.",
    rating: 5,
  },
  {
    name: "Lê Văn C",
    role: "Doanh nhân",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment:
      "Giá cả hợp lý, giao hàng đúng hẹn. Đã giới thiệu cho nhiều bạn bè cùng sử dụng.",
    rating: 5,
  },
  {
    name: "Lê Văn C",
    role: "Doanh nhân",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment:
      "Giá cả hợp lý, giao hàng đúng hẹn. Đã giới thiệu cho nhiều bạn bè cùng sử dụng.",
    rating: 5,
  },
  {
    name: "Lê Văn C",
    role: "Doanh nhân",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment:
      "Giá cả hợp lý, giao hàng đúng hẹn. Đã giới thiệu cho nhiều bạn bè cùng sử dụng.",
    rating: 5,
  },
  {
    name: "Lê Văn C",
    role: "Doanh nhân",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment:
      "Giá cả hợp lý, giao hàng đúng hẹn. Đã giới thiệu cho nhiều bạn bè cùng sử dụng.",
    rating: 5,
  },
]
