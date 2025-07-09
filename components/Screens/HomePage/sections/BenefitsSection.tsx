import { benefits } from "@/utils/mock-data"
import { FaDollarSign, FaGlobe, FaShieldAlt, FaTruck } from "react-icons/fa"

/**
 * Benefits section component
 * Shows why customers should choose the service
 */
const BenefitsSection = () => {
  return (
    <section className="py-16 lg:py-24 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl font-bold text-heading-light mb-4 leading-tight">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Chúng tôi mang đến trải nghiệm mua sắm Taobao/1688 tốt nhất với
            những ưu điểm vượt trội
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-100 transition-colors">
                {index === 0 && (
                  <FaGlobe size={25} className="text-orange-500" />
                )}
                {index === 1 && (
                  <FaDollarSign size={25} className="text-orange-500" />
                )}
                {index === 2 && (
                  <FaShieldAlt size={25} className="text-orange-500" />
                )}
                {index === 3 && (
                  <FaTruck size={25} className="text-orange-500" />
                )}
              </div>
              <h3 className="text-lg md:text-lg font-bold text-black mb-3 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection 