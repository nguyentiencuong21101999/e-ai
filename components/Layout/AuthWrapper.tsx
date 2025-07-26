"use client"

import AuthPopup from "@/components/Screens/Popups/AuthPopup"
import ForgotPasswordPopup from "@/components/Screens/Popups/ForgotPasswordPopup"
import SignUpPopup from "@/components/Screens/Popups/SignUpPopup"
import { useAppSelector } from "@/redux/hook"
import React, { useEffect, useState } from "react"
import ClientOnly from "./ClientOnly"

interface AuthWrapperProps {
  children: React.ReactNode
}

// Enum để quản lý loại popup hiện tại
type PopupType = 'signin' | 'signup' | 'forgot-password' | 'none'

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  // Lấy accessToken từ redux
  const accessToken = useAppSelector(state => state.authReducer.profile?.accessToken)
  const [currentPopup, setCurrentPopup] = useState<PopupType>('none')

  useEffect(() => {
    // Chỉ hiển thị popup đăng nhập nếu chưa có accessToken
    if (!accessToken) {
      setCurrentPopup('signin')
    } else {
      setCurrentPopup('none')
    }
  }, [accessToken])

  // Các hàm xử lý chuyển đổi popup
  const handleSwitchToSignUp = () => {
    setCurrentPopup('signup')
  }

  const handleSwitchToForgotPassword = () => {
    setCurrentPopup('forgot-password')
  }

  const handleBackToSignIn = () => {
    setCurrentPopup('signin')
  }

  return (
    <>
      {/* Hiển thị các popup auth - KHÔNG cho phép tắt */}
      <ClientOnly>
        {/* Popup đăng nhập */}
        <AuthPopup 
          isOpen={currentPopup === 'signin'} 
          onClose={() => {}} // Không cho phép đóng popup thủ công
          allowClose={false} // Vô hiệu hóa nút close và click backdrop
          onSwitchToSignUp={handleSwitchToSignUp}
          onSwitchToForgotPassword={handleSwitchToForgotPassword}
        />

        {/* Popup đăng ký */}
        <SignUpPopup 
          isOpen={currentPopup === 'signup'} 
          onClose={() => {}} // Không cho phép đóng popup thủ công
          onSwitchToSignIn={handleBackToSignIn}
          allowClose={false} // Vô hiệu hóa nút close và click backdrop
        />

        {/* Popup quên mật khẩu */}
        <ForgotPasswordPopup 
          isOpen={currentPopup === 'forgot-password'} 
          onClose={() => {}} // Không cho phép đóng popup thủ công
          onBackToSignIn={handleBackToSignIn}
          allowClose={false} // Vô hiệu hóa nút close và click backdrop
        />
      </ClientOnly>
      {children}
    </>
  )
}

export default AuthWrapper 