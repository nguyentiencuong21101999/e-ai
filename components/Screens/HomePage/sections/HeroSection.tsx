import Button from "@/components/Common/Button"
import { FaHeadset, FaShoppingCart, FaStar } from "react-icons/fa"

/**
 * Hero section component for the homepage
 * Features orange color scheme and modern design
 */
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden lg:mx-6 rounded-lg">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16  lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black leading-tight mb-6">
              Mua sắm <span className="text-orange-600">Taobao</span>
              <br />
              <span className="text-orange-700">dễ dàng</span> hơn bao giờ hết
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-lg leading-relaxed">
              Kết nối trực tiếp với hàng triệu sản phẩm chính hãng từ Trung
              Quốc. Giá tốt nhất, chất lượng đảm bảo, giao hàng tận nơi.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 px-8 text-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
              >
                <FaShoppingCart className="mr-2" /> Mua ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-orange-500 text-orange-500 px-8 text-lg font-semibold hover:scale-105 transition-transform duration-300"
              >
                <FaHeadset className="mr-2" /> Tư vấn miễn phí
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-orange-500" />
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span className="text-gray-700">(2,547 đánh giá)</span>
              </div>
              <div className="text-gray-700">
                <span className="font-semibold text-orange-700">10,000+</span>{" "}
                khách hàng tin tưởng
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
                HOT DEAL
              </div>
              <img
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop&crop=center"
                alt="Featured Product"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900">
                  iPhone 15 Pro Max
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-orange-600">
                    25,999,000đ
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    32,999,000đ
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-bold">
                    -21%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
