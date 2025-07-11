import Button from "@/components/Common/Button"
import Input from "@/components/Common/Input"
import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"

/**
 * Compact footer component with clean design
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
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
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Cung cấp các giải pháp AI tiên tiến để tối ưu hóa quy trình kinh
              doanh và nâng cao hiệu suất làm việc.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <FacebookOutlined className="text-sm text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <InstagramOutlined className="text-sm text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <TwitterOutlined className="text-sm text-white" />
              </a>
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <YoutubeOutlined className="text-sm text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  Dịch vụ AI
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <EnvironmentOutlined className="text-pink-600 mt-1 text-sm" />
                <p className="text-gray-700 text-sm">
                  123 Đường AI Tech, Quận 7, TP.HCM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-pink-600 text-sm" />
                <a
                  href="tel:1900123456"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  1900 1234
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MailOutlined className="text-pink-600 text-sm" />
                <a
                  href="mailto:support@e-ai.vn"
                  className="text-gray-700 hover:text-pink-600 text-sm transition-colors"
                >
                  support@e-ai.vn
                </a>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/contact">
                <Button variant="primary" size="sm" className="text-sm">
                  Tư vấn miễn phí
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-base font-semibold text-black mb-1">
                Đăng ký nhận thông báo
              </h4>
              <p className="text-gray-600 text-sm">
                Nhận thông tin về các giải pháp AI mới
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
                className="min-w-[250px] text-sm"
              />
              <Button variant="primary" size="md" className="text-sm w-full">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-gray-600 text-sm">
              © 2024 E-AI. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-pink-600 text-sm transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-600 hover:text-pink-600 text-sm transition-colors"
              >
                Điều khoản dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
