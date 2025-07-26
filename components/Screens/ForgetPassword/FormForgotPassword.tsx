"use client"

import Button from "@/components/Common/Button"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

interface FormForgotPasswordData {
  email: string
}

interface FormForgotPasswordProps {
  isPopup?: boolean
  onClosePopup?: () => void
  onBackToSignIn?: () => void
}

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
})

/**
 * Form quên mật khẩu với email và username
 * Designed to match FormSignIn styling and behavior
 */
const FormForgotPassword: React.FC<FormForgotPasswordProps> = ({
  isPopup = false,
  onClosePopup,
  onBackToSignIn,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, formState, reset } =
    useForm<FormForgotPasswordData>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
        email: "",
      },
    })

  const onSubmitHandler = async (formData: FormForgotPasswordData) => {
    const { email } = formData
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      showToast(
        "Mật khẩu mới đã được gửi đến email, vui lòng kiểm tra!",
        "success"
      )
      reset() // Reset form
      if (isPopup && onClosePopup) {
        onClosePopup()
      }
    }, 1500)
  }

  const handleBackToLogin = () => {
    reset() // Reset form
    if (onBackToSignIn) {
      onBackToSignIn()
    }
  }

  const formContent = (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`w-full ${
          isPopup
            ? "min-w-[320px] max-w-[600px]"
            : "h-[90vh] max-w-[90vw] md:max-w-[800px]"
        } flex items-center bg-white rounded-2xl shadow-xl overflow-hidden`}
      >
        {/* Single Column - No Image Section */}
        <div
          className={`w-full ${
            isPopup ? "py-4 lg:py-6" : "h-full"
          } flex items-center justify-center mx-auto px-4 md:px-0`}
        >
          <div className="w-full max-w-md h-full bg-white rounded-2xl py-4 px-4 md:p-10 flex flex-col justify-center">
            {/* Brand Section */}
            <div className="text-center mb-12 ml-2">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="text-xl font-bold text-heading-light mb-3">
                Quên mật khẩu
              </div>
              <p className="text-lg text-gray-900 font-medium">
                Nhập email của bạn để nhận mật khẩu mới
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-8"
            >
              <div className="space-y-6">
                {/* Email field */}
                <div>
                  <InputField
                    title="Email"
                    placeholder="Nhập email của bạn"
                    name="email"
                    type="email"
                    control={control}
                    formState={formState}
                    className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading || (formState.isSubmitted && !formState.isValid)}
                  size="lg"
                  className="w-full text-lg"
                >
                  Gửi mật khẩu mới
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-gray-500 text-sm">
                    Hoặc
                  </span>
                </div>
              </div>

              {/* Back to login */}
              <div className="text-center">
                <span className="text-sm text-gray-800 font-medium">
                  Nhớ lại mật khẩu?{" "}
                </span>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-300"
                >
                  Đăng nhập ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  if (isPopup) {
    return formContent
  }

  return formContent
}

export default FormForgotPassword
