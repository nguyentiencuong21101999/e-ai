import Button from "@/components/Common/Button"
import Input from "@/components/Common/Input"
import {
    ClockCircleOutlined,
    CustomerServiceOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    RobotOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"

/**
 * Modern footer component with pink theme
 * Designed for E-AI platform
 */
const Footer: React.FC = () => {
  const { control, formState } = useForm({
    defaultValues: {
      email: "",
    },
  })

  return (
    <footer className="bg-white">
      {/* Main footer content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-pink-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
                EAI
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold text-black">E-AI</h3>
                <p className="text-pink-600 text-sm font-medium">
                  AI-Powered Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              Cung cấp các giải pháp AI tiên tiến và dịch vụ trí tuệ nhân tạo 
              để tối ưu hóa quy trình kinh doanh và nâng cao hiệu suất làm việc 
              cho doanh nghiệp.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-9 h-9 hover:scale-110"
              >
                <FacebookOutlined className="text-lg text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-9 h-9 hover:scale-110"
              >
                <InstagramOutlined className="text-lg text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-9 h-9 hover:scale-110"
              >
                <TwitterOutlined className="text-lg text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-9 h-9 hover:scale-110"
              >
                <YoutubeOutlined className="text-lg text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Dịch vụ AI
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-800 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-110"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Dịch vụ AI</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <RobotOutlined className="text-pink-600" />
                <span>AI Automation</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <ThunderboltOutlined className="text-pink-600" />
                <span>Machine Learning</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <SafetyCertificateOutlined className="text-pink-600" />
                <span>AI Consulting</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CustomerServiceOutlined className="text-pink-600" />
                <span>Hỗ trợ 24/7</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="primary" size="md">
                  <CustomerServiceOutlined />
                  Tư vấn miễn phí
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="text-pink-600 mt-1" />
                <div>
                  <p className="text-gray-700">
                    123 Đường AI Tech, Quận 7<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneOutlined className="text-pink-600" />
                <div>
                  <p className="text-gray-700">Hotline: </p>
                  <a
                    href="tel:1900123456"
                    className="text-pink-700 font-medium hover:text-pink-800"
                  >
                    1900 1234
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MailOutlined className="text-pink-600" />
                <div>
                  <a
                    href="mailto:support@e-ai.vn"
                    className="text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    support@e-ai.vn
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockCircleOutlined className="text-pink-600 mt-1" />
                <div>
                  <p className="text-gray-700">
                    Thứ 2 - Chủ Nhật
                    <br />
                    8:00 - 22:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-black mb-2">
                Đăng ký nhận thông báo
              </h4>
              <p className="text-gray-700">
                Nhận thông tin về các giải pháp AI mới và cập nhật công nghệ
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                control={control}
                formState={formState}
                name="email"
                type="email"
                placeholder="Nhập email của bạn"
                variant="outlined"
                className="min-w-[200px]"
              />
              <Button variant="primary" size="md" className="w-full">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-gray-600 text-sm">
              © 2024 E-AI. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-800 hover:text-gray-900 text-sm font-medium transition-all duration-300 hover:scale-110"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-800 hover:text-gray-900 text-sm font-medium transition-all duration-300 hover:scale-110"
              >
                Điều khoản dịch vụ
              </Link>
              <Link
                href="/ai-ethics"
                className="text-gray-800 hover:text-gray-900 text-sm font-medium transition-all duration-300 hover:scale-110"
              >
                Đạo đức AI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
