"use client"

import FormForgotPassword from "@/components/Screens/ForgetPassword/FormForgotPassword"
import { useScrollToTop } from "@/hooks/useScrollToTop"

const ForgotPasswordPage = () => {
  useScrollToTop()
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <title className="mt-100px">Quên mật khẩu</title>
      <FormForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage 