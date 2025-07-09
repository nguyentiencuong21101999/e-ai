import Button from "@/components/Common/Button"
import { FaChartLine, FaCog, FaRocket, FaUserPlus } from "react-icons/fa"

/**
 * How It Works section for E-AI platform
 * Shows the process of using AI services
 */
const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-3xl text-pink-500" />,
      title: "Đăng ký tài khoản",
      description: "Tạo tài khoản E-AI miễn phí và khám phá các dịch vụ AI đa dạng"
    },
    {
      id: 2,
      icon: <FaCog className="text-3xl text-pink-500" />,
      title: "Cấu hình AI",
      description: "Chọn và tùy chỉnh các dịch vụ AI phù hợp với nhu cầu kinh doanh"
    },
    {
      id: 3,
      icon: <FaRocket className="text-3xl text-pink-500" />,
      title: "Tích hợp & Triển khai",
      description: "Sử dụng API hoặc SDK để tích hợp AI vào hệ thống của bạn"
    },
    {
      id: 4,
      icon: <FaChartLine className="text-3xl text-pink-500" />,
      title: "Phân tích & Tối ưu",
      description: "Theo dõi hiệu suất và cải thiện liên tục với AI analytics"
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-pink-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Cách sử dụng <span className="text-pink-600">E-AI</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Chỉ với 4 bước đơn giản, bạn có thể bắt đầu sử dụng 
            các dịch vụ AI mạnh mẽ của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="text-center group">
                <div className="relative">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-4 border-pink-100">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-black mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-pink-300">
                  <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-4 border-l-pink-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Sẵn sàng bắt đầu với <span className="text-pink-600">AI</span>?
            </h3>
            <p className="text-gray-700 mb-6">
              Tham gia cùng hàng nghìn doanh nghiệp đã chọn E-AI 
              để chuyển đổi số thông minh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8"
              >
                Dùng thử miễn phí
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-pink-500 text-pink-500 px-8"
              >
                Xem demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection 