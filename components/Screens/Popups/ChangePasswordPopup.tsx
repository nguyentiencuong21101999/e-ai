"use client"

import Button from "@/components/Common/Button"
import {
  HiddenPasswordIcon,
  VisiblePasswordIcon,
} from "@/components/Common/Icons"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import { handleClearAuth } from "@/redux/features/auth/action"
import { changePassword } from "@/redux/features/user/action"
import { IChangePasswordRequestDto } from "@/redux/features/user/dtos/profile.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { IoMdClose, IoMdKey } from "react-icons/io"
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

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  const { loadingChangePassword } = useAppSelector((state) => state.userReducer)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Use custom hook to handle body scroll lock
  useBodyScrollLock(isOpen)

  const { control, handleSubmit, formState, reset, watch } =
    useForm<ChangePasswordFormData>({
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
    try {
      const payload: IChangePasswordRequestDto = {
        currentPassword: data.currentPassword,
        password: data.newPassword,
      }

      await dispatch(changePassword(payload)).unwrap()
      
      showToast("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.", "success")
      
      // Clear authentication and force re-login
      dispatch(handleClearAuth())
      
      reset()
      onClose()
    } catch (error) {
      showToast("Đổi mật khẩu thất bại. Vui lòng thử lại!", "error")
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 p-4"
      style={{
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        height: "100vh",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <IoMdKey className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Đổi mật khẩu</h2>
                <p className="text-orange-100 text-sm">
                  Cập nhật mật khẩu bảo mật
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            >
              <IoMdClose className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Current Password */}
            <div>
              <InputField
                title="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
                name="currentPassword"
                type="password"
                control={control}
                formState={formState}
                className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50"
                hidePasswordIcon={<HiddenPasswordIcon />}
                showPasswordIcon={<VisiblePasswordIcon />}
              />
            </div>

            {/* New Password */}
            <div>
              <InputField
                title="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                name="newPassword"
                type="password"
                control={control}
                formState={formState}
                className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50"
                hidePasswordIcon={<HiddenPasswordIcon />}
                showPasswordIcon={<VisiblePasswordIcon />}
              />
              
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-900">Độ mạnh mật khẩu:</span>
                    <span
                      className={`font-medium ${
                        getStrengthText(passwordStrength).color
                      }`}
                    >
                      {getStrengthText(passwordStrength).text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        passwordStrength <= 1
                          ? "bg-red-500"
                          : passwordStrength <= 2
                          ? "bg-yellow-500"
                          : passwordStrength <= 4
                          ? "bg-green-500"
                          : "bg-green-600"
                      }`}
                      style={{ width: getStrengthWidth(passwordStrength) }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <InputField
                title="Xác nhận mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
                name="confirmPassword"
                type="password"
                control={control}
                formState={formState}
                className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50"
                hidePasswordIcon={<HiddenPasswordIcon />}
                showPasswordIcon={<VisiblePasswordIcon />}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loadingChangePassword}
                size="lg"
                className="flex-1 w-full text-sm"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                loading={loadingChangePassword}
                disabled={
                  loadingChangePassword ||
                  !formState.isDirty ||
                  (formState.isSubmitted && !formState.isValid)
                }
                size="lg"
                className="flex-1 w-full text-sm"
              >
                Đổi mật khẩu
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPopup
