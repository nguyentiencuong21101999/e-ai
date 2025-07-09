import { useWindowWidth } from "@/hooks/useWindowWidth"
import Marquee from "react-fast-marquee"
import { FaStar } from "react-icons/fa"

/**
 * Testimonials section component for E-AI platform
 * Shows customer reviews about AI services in a marquee
 */
const TestimonialsSection = () => {
  const width = useWindowWidth()

  const testimonials = [
    {
      name: "Nguyễn Văn Minh",
      role: "CTO, Tech Startup",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "E-AI đã giúp chúng tôi tự động hóa 90% quy trình dịch thuật. Hiệu quả và chính xác tuyệt vời!"
    },
    {
      name: "Trần Thị Lan",
      role: "Giám đốc Marketing",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Dịch vụ AI chatbot của E-AI đã cải thiện customer experience của chúng tôi rất nhiều."
    },
    {
      name: "Lê Hoàng Nam",
      role: "Data Analyst",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Công cụ phân tích dữ liệu AI rất mạnh mẽ, giúp chúng tôi khám phá insights quan trọng."
    },
    {
      name: "Phạm Thị Hoa",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Platform E-AI dễ sử dụng và tích hợp rất smooth. Team support cũng rất professional."
    },
    {
      name: "Đặng Quốc Tuấn",
      role: "AI Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "API của E-AI có performance tuyệt vời và documentation rất chi tiết, dễ implement."
    }
  ]

  // Calculate number of items to show based on screen width (max 1140px)
  const getItemsCount = () => {
    const effectiveWidth = Math.min(width, 1140) // Limit to max width 1140px
    if (effectiveWidth >= 1140) return 5 // max width: 5 items
    if (effectiveWidth >= 1024) return 4 // lg: 4 items
    if (effectiveWidth >= 768) return 3 // md: 3 items
    return 1 // mobile: 1 item
  }

  // Calculate item width based on screen width and items count
  const getItemWidth = () => {
    const itemsCount = getItemsCount()
    const gap = 16 // 4 * 4px (gap-4)
    const padding = 32 // container padding
    const effectiveWidth = Math.min(width, 1140) // Use max width 1140px
    const availableWidth = effectiveWidth - padding
    const itemWidth = (availableWidth - gap * (itemsCount - 1)) / itemsCount
    return Math.max(itemWidth, 250) // minimum width 250px
  }

  const itemWidth = getItemWidth()

  return (
    <section className="relative bg-pink-50 mx-2 py-16">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Khách hàng nói gì về <span className="text-pink-600">E-AI</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hàng nghìn doanh nghiệp đã tin tưởng và hài lòng với 
            giải pháp AI của chúng tôi
          </p>
        </div>

        {/* Testimonials marquee */}
        <div className="absolute overflow-hidden overflow-x-hidden w-full">
          <Marquee
            speed={40}
            direction="right"
            pauseOnHover={true}
            className="py-4"
            autoFill={false}
          >
            <div className="flex gap-4 w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`testimonial-${index}`}
                  className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-101 border border-pink-200 hover:border-pink-300 flex-shrink-0 mx-2"
                  style={{ width: `${itemWidth}px` }}
                >
                  <div className="flex items-center mb-4 w-full">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="text-md font-semibold text-black leading-snug">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-pink-500 text-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-800 italic leading-relaxed">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
      <div className="h-[200px]"></div>
    </section>
  )
}

export default TestimonialsSection
