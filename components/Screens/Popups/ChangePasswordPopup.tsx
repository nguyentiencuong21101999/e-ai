"use client"

import Button from "@/components/Common/Button"
import { HiddenPasswordIcon, VisiblePasswordIcon } from "@/components/Common/Icons"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { IoMdCheckmarkCircle, IoMdClose, IoMdKey } from "react-icons/io"
import { MdSecurity } from "react-icons/md"
import * as yup from "yup"

interface ChangePasswordPopupProps {
  isOpen: boolean
  onClose: () => void
}

interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu hiện tại")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu mới")
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp"),
})

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    control,
    handleSubmit,
    formState,
    reset,
    watch
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const newPassword = watch("newPassword")

  // Calculate password strength
  React.useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (newPassword.length >= 8) strength += 1
    if (/[a-z]/.test(newPassword)) strength += 1
    if (/[A-Z]/.test(newPassword)) strength += 1
    if (/\d/.test(newPassword)) strength += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) strength += 1

    setPasswordStrength(strength)
  }, [newPassword])

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual password change API call
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      showToast("Đổi mật khẩu thành công!", "success")
      reset()
      onClose()
    } catch (error) {
      showToast("Đổi mật khẩu thất bại. Vui lòng thử lại!", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Yếu", color: "text-red-500" }
      case 2:
        return { text: "Trung bình", color: "text-yellow-500" }
      case 3:
      case 4:
        return { text: "Mạnh", color: "text-green-500" }
      case 5:
        return { text: "Rất mạnh", color: "text-green-600" }
      default:
        return { text: "", color: "" }
    }
  }

  const getStrengthWidth = (strength: number) => {
    return `${(strength / 5) * 100}%`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" 
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <IoMdKey className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Đổi mật khẩu</h2>
                  <p className="text-blue-100 text-sm">Cập nhật mật khẩu bảo mật</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Current Password */}
              <div className="animate-slide-down">
                <InputField
                  title="Mật khẩu hiện tại"
                  placeholder="Nhập mật khẩu hiện tại"
                  name="currentPassword"
                  type="password"
                  control={control}
                  formState={formState}
                  className="w-full py-3 px-4 rounded-xl border focus:border-blue-500 text-sm bg-gray-50/50"
                  hidePasswordIcon={<HiddenPasswordIcon />}
                  showPasswordIcon={<VisiblePasswordIcon />}
                />
              </div>

              {/* New Password */}
              <div className="animate-slide-down animation-delay-100">
                <InputField
                  title="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  name="newPassword"
                  type="password"
                  control={control}
                  formState={formState}
                  className="w-full py-3 px-4 rounded-xl border focus:border-blue-500 text-sm bg-gray-50/50"
                  hidePasswordIcon={<HiddenPasswordIcon />}
                  showPasswordIcon={<VisiblePasswordIcon />}
                />
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Độ mạnh mật khẩu:</span>
                      <span className={`font-medium ${getStrengthText(passwordStrength).color}`}>
                        {getStrengthText(passwordStrength).text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          passwordStrength <= 1 ? 'bg-red-500' :
                          passwordStrength <= 2 ? 'bg-yellow-500' :
                          passwordStrength <= 4 ? 'bg-green-500' : 'bg-green-600'
                        }`}
                        style={{ width: getStrengthWidth(passwordStrength) }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="animate-slide-down animation-delay-200">
                <InputField
                  title="Xác nhận mật khẩu mới"
                  placeholder="Nhập lại mật khẩu mới"
                  name="confirmPassword"
                  type="password"
                  control={control}
                  formState={formState}
                  className="w-full py-3 px-4 rounded-xl border focus:border-blue-500 text-sm bg-gray-50/50"
                  hidePasswordIcon={<HiddenPasswordIcon />}
                  showPasswordIcon={<VisiblePasswordIcon />}
                />
              </div>

              {/* Security Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-slide-up animation-delay-300">
                <div className="flex items-start gap-3">
                  <MdSecurity className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-1">
                      Gợi ý mật khẩu mạnh:
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li className="flex items-center gap-2">
                        <IoMdCheckmarkCircle className="w-3 h-3" />
                        Ít nhất 8 ký tự
                      </li>
                      <li className="flex items-center gap-2">
                        <IoMdCheckmarkCircle className="w-3 h-3" />
                        Chứa cả chữ hoa và chữ thường
                      </li>
                      <li className="flex items-center gap-2">
                        <IoMdCheckmarkCircle className="w-3 h-3" />
                        Có ít nhất 1 số và ký tự đặc biệt
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 animate-slide-up animation-delay-400">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 py-3 border-gray-300 text-gray-700 hover:border-gray-400"
                  disabled={isLoading}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!formState.isValid}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPopup 