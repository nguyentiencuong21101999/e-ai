"use client"

import { FormSignIn } from "@/components/Screens/SignIn/Main"
import { useScrollToTop } from "@/hooks/useScrollToTop"

const LoginPage = () => {
  useScrollToTop()
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <title className="mt-100px">Đăng nhập</title>
      <FormSignIn />
    </div>
  )
}

export default LoginPage
