"use client"

import React, { useEffect, useState } from "react"

// Import Swiper styles
import Button from "@/components/Common/Button"
import { handleClearAuth, handleSignOut } from "@/redux/features/auth/action"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
    CustomerServiceOutlined,
    PhoneOutlined,
    SearchOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaBars, FaChevronLeft, FaTimes } from "react-icons/fa"
import { showToast } from "../Common/Toast"
import AuthPopup from "../Screens/Popups/AuthPopup"
import ForgotPasswordPopup from "../Screens/Popups/ForgotPasswordPopup"
import SignUpPopup from "../Screens/Popups/SignUpPopup"
import UserDropdown from "./UserDropdown"

/**
 * Modern ecommerce header component with pink theme và smooth animations
 * Designed for E-AI platform
 */
const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { profile } = useAppSelector((state) => state.authReducer)
  const [isDropDown, setIsDropDown] = useState<boolean>(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState<boolean>(false)
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState<boolean>(false)
  const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] =
    useState<boolean>(false)

  const accessToken = profile?.accessToken
  const router = useRouter()

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true)
    }
  }, [accessToken])

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false) // Hide header when scrolling down
      } else {
        setIsHeaderVisible(true) // Show header when scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleShowDropDown = () => {
    setIsDropDown(!isDropDown)
    if (isUserDropdownOpen) setIsUserDropdownOpen(false)
  }

  const handleToggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen)
    if (isDropDown) setIsDropDown(false)
  }

  const handleCloseUserDropdown = () => {
    setIsUserDropdownOpen(false)
  }

  const submitSignOut = async () => {
    const res = await dispatch(handleSignOut()).unwrap()
    if (!res) return

    dispatch(handleClearAuth())
    setIsLogin(false)
    showToast("Đăng xuất thành công!", "success")
  }

  const handleSwitchToSignUp = () => {
    setIsAuthPopupOpen(false)
    setIsSignUpPopupOpen(true)
  }

  const handleSwitchToSignIn = () => {
    setIsSignUpPopupOpen(false)
    setIsAuthPopupOpen(true)
  }

  const handleSwitchToForgotPassword = () => {
    setIsAuthPopupOpen(false)
    setIsForgotPasswordPopupOpen(true)
  }

  const handleBackToSignIn = () => {
    setIsForgotPasswordPopupOpen(false)
    setIsAuthPopupOpen(true)
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Kiểm tra nếu click không phải từ UserDropdown component
      if (
        !target.closest("[data-user-dropdown]") &&
        !target.closest("[data-mobile-menu]")
      ) {
        setIsDropDown(false)
        setIsUserDropdownOpen(false)
      }
    }

    // Chỉ thêm listener sau khi dropdown đã được mở và DOM đã render
    const timeoutId = setTimeout(() => {
      if (isDropDown || isUserDropdownOpen) {
        document.addEventListener("click", handleClickOutside)
      }
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isDropDown, isUserDropdownOpen])

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 z-[100] bg-white shadow-md transition-all duration-500 ease-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top bar với animation */}
        <div className="bg-pink-50 border-b border-pink-100 animate-slide-down">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-4 text-gray-700">
                <span className="animate-fade-in">
                  🤖 AI-Powered Solutions for Your Business
                </span>
                <span className="hidden md:inline animate-fade-in animation-delay-100">
                  |
                </span>
                <span className="hidden md:inline animate-fade-in animation-delay-200">
                  ⚡ Hỗ trợ 24/7
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-pink-700 hover:text-pink-800 cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-300">
                  <PhoneOutlined className="animate-pulse-slow" />
                  <span className="hidden sm:inline font-medium">
                    1900 1234
                  </span>
                </div>
                <div className="flex items-center gap-2 text-pink-700 hover:text-pink-800 cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-400">
                  <CustomerServiceOutlined className="animate-pulse-slow" />
                  <span className="hidden sm:inline font-medium">Hỗ trợ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main header với enhanced animations */}
        <div className="bg-white border-b border-gray-200 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button với rotation animation */}
              <div className="lg:hidden" data-mobile-menu>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShowDropDown()
                  }}
                  className="bg-pink-500 hover:bg-pink-600 w-10 h-10 flex items-center justify-center rounded-lg text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg animate-bounce-in"
                >
                  <div
                    className={`transition-transform duration-300 ${
                      isDropDown ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    {isDropDown ? <FaTimes size={18} /> : <FaBars size={18} />}
                  </div>
                </button>
              </div>

              {/* Logo với hover animation */}
              <div className="flex items-center animate-slide-in-left">
                <Link href="/" className="flex items-center group">
                  <div className="bg-pink-500 text-white px-3 py-2 rounded-lg font-bold text-xl transition-all duration-300 group-hover:bg-pink-600 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-lg animate-glow">
                    EAI
                  </div>
                  <div className="ml-3 hidden md:block">
                    <h1 className="text-xl font-bold text-black transition-colors duration-300 group-hover:text-pink-600">
                      E-AI
                    </h1>
                    <p className="text-xs text-pink-600 transition-all duration-300 group-hover:text-pink-700 group-hover:scale-105">
                      AI-Powered Solutions
                    </p>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation với staggered animations */}
              <nav className="hidden lg:flex items-center space-x-8 animate-fade-in animation-delay-200">
                {[
                  { href: "/", label: "Trang chủ" },
                  { href: "/contact", label: "Liên hệ" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-heading-light hover:text-pink-600 text-16 font-medium transition-all duration-300 hover:scale-110 animate-slide-up group`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Right side actions với enhanced animations */}
              <div className="flex items-center gap-3 animate-slide-in-right">
                {/* Search button */}
                <button className="p-2 text-gray-700 hover:text-pink-600 text-base transition-all duration-300 hover:scale-110 hover:rotate-12 rounded-full hover:bg-pink-50">
                  <SearchOutlined className="text-lg" />
                </button>

                {/* User account */}
                {isLogin ? (
                  <div onClick={(e) => e.stopPropagation()} data-user-dropdown>
                    <UserDropdown
                      isOpen={isUserDropdownOpen}
                      onToggle={handleToggleUserDropdown}
                      onClose={handleCloseUserDropdown}
                      isHeaderVisible={isHeaderVisible}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 animate-bounce-in animation-delay-500">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAuthPopupOpen(true)}
                      className="text-16 font-medium border-pink-500 text-pink-500 hover:border-pink-600 hover:text-pink-600"
                    >
                      <UserOutlined className="mr-0 sm:mr-2" />
                      <span className="hidden sm:inline">Đăng nhập</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsSignUpPopupOpen(true)}
                      className="text-16 font-medium bg-pink-500 text-white hover:bg-pink-600"
                    >
                      <UserAddOutlined className="mr-0 sm:mr-2" />
                      <span className="hidden sm:inline">Đăng ký</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu với slide animation */}
        {isDropDown && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg animate-slide-down">
            <nav className="px-4 py-2 space-y-1">
              {[
                { href: "/", label: "Trang chủ" },
                { href: "/contact", label: "Liên hệ" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleShowDropDown}
                  className={`group flex items-center justify-between p-3 text-[15px] text-heading-light hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-all duration-300 font-medium hover:scale-105 hover:shadow-md animate-slide-in-left`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{item.label}</span>
                  <FaChevronLeft
                    size={12}
                    className="text-pink-500 transition-transform duration-300 group-hover:-rotate-180"
                  />
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Spacer to account for fixed header */}
      <div className="h-[106px] animate-fade-in"></div>

      {/* Auth Popup */}
      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />

      {/* Sign Up Popup */}
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={() => setIsSignUpPopupOpen(false)}
        onSwitchToSignIn={handleSwitchToSignIn}
      />

      {/* Forgot Password Popup */}
      <ForgotPasswordPopup
        isOpen={isForgotPasswordPopupOpen}
        onClose={() => setIsForgotPasswordPopupOpen(false)}
        onBackToSignIn={handleBackToSignIn}
      />
    </>
  )
}

export default Header
