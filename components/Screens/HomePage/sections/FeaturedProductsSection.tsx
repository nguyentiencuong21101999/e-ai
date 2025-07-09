import Button from "@/components/Common/Button"
import { featuredProducts } from "@/utils/mock-data"
import { FaArrowRight, FaShoppingCart, FaStar } from "react-icons/fa"

/**
 * Featured Products section component
 * Shows a grid of featured products
 */
const FeaturedProductsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-xl font-bold text-heading-light mb-4 leading-tight">
              Sản phẩm nổi bật
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Những sản phẩm bán chạy nhất được khách hàng yêu thích
            </p>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="md"
            className="border-2 border-orange-500 text-orange-600 font-semibold hover:scale-105 transition-transform duration-300"
          >
            <FaArrowRight className="mr-2" /> Xem tất cả
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">
                  -{product.discount}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaShoppingCart className="text-orange-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base md:text-lg font-bold text-black mb-2 line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <FaStar className="text-orange-500 text-sm" />
                  <span className="text-sm font-medium text-gray-800">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg font-bold text-orange-700">
                    {product.price}đ
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 line-through">
                    {product.originalPrice}đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProductsSection 