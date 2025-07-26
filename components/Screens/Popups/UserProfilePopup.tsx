"use client"

import Button from "@/components/Common/Button"
import DatePicker from "@/components/Common/DatePicker"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import { updateUserProfile } from "@/redux/features/user"
import { IUpdateUserProfileRequestDto } from "@/redux/features/user/dtos/profile.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { IoMdClose, IoMdPerson } from "react-icons/io"
import { LuInfo } from "react-icons/lu"
import { MdManageAccounts } from "react-icons/md"
import * as yup from "yup"

interface UserProfilePopupProps {
  isOpen: boolean
  onClose: () => void
}

interface FormProfileData {
  username: string
  email: string
  fullName: string
  phoneNumber: string
  dob: string
}

const schema = yup.object().shape({
  username: yup.string().trim().required("Tên đăng nhập là bắt buộc"),
  email: yup
    .string()
    .trim()
    .required("Email là bắt buộc")
    .email("Email không hợp lệ"),
  fullName: yup.string().trim().required("Họ và tên là bắt buộc"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Số điện thoại là bắt buộc")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      {
        message: "Số điện thoại không hợp lệ",
      }
    ),
  dob: yup.string().trim(),
})

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch()
  // Get profile from auth reducer (current logged in user)
  const { profile: authProfile } = useAppSelector((state) => state.authReducer)
  const { loadingUpdateProfile } = useAppSelector((state) => state.userReducer)

  // Use custom hook to handle body scroll lock
  useBodyScrollLock(isOpen)

  const { control, handleSubmit, formState, reset } = useForm<FormProfileData>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      dob: "",
    },
  })

  // Load profile data when popup opens
  useEffect(() => {
    if (isOpen && authProfile) {
      reset({
        username: authProfile.username || "",
        email: authProfile.email || "",
        fullName: authProfile.fullName || "",
        phoneNumber: authProfile.phoneNumber || "",
        dob: authProfile.dob || "",
      })
    }
  }, [isOpen, authProfile, reset])

  const onSubmitHandler = async (formData: FormProfileData) => {
    try {
      const updateData: IUpdateUserProfileRequestDto = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        dob: formData.dob,
      }

      await dispatch(updateUserProfile(updateData)).unwrap()

      showToast("Cập nhật thông tin thành công!", "success")
    } catch (error) {
      showToast("Cập nhật thông tin thất bại!", "error")
    }
  }

  const handleClose = () => {
    reset()
    onClose()
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
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <IoMdPerson className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
                <p className="text-orange-100 text-sm">
                  Cập nhật thông tin tài khoản của bạn
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
        <div className="p-6 lg:p-8 overflow-y-auto flex-1">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Tài khoản Section */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex gap-2 items-center text-sm lg:text-base font-semibold text-heading-light border-b border-orange-100 pb-2">
                <MdManageAccounts
                  size={16}
                  className="text-orange-600 lg:w-[18px] lg:h-[18px]"
                />
                <span>Tài khoản</span>
              </div>

              <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
                {/* Username - Disabled */}
                <div>
                  <InputField
                    title="Tên đăng nhập"
                    placeholder="Tên đăng nhập"
                    name="username"
                    type="text"
                    control={control}
                    formState={formState}
                    disabled={true}
                    className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border text-sm bg-gray-100 cursor-not-allowed placeholder:text-sm"
                  />
                </div>

                {/* Email - Disabled */}
                <div>
                  <InputField
                    title="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    control={control}
                    formState={formState}
                    disabled={true}
                    className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border text-sm bg-gray-100 cursor-not-allowed placeholder:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Thông tin Section */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex gap-2 items-center text-sm lg:text-base font-semibold text-heading-light border-b border-orange-100 pb-2">
                <LuInfo
                  size={16}
                  className="text-orange-600 lg:w-[18px] lg:h-[18px]"
                />
                <span>Thông tin cá nhân</span>
              </div>

              <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <InputField
                    title="Họ tên"
                    placeholder="Nhập họ và tên của bạn"
                    name="fullName"
                    type="text"
                    control={control}
                    formState={formState}
                    className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <InputField
                    title="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    type="text"
                    control={control}
                    formState={formState}
                    className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                  />
                </div>

                {/* Date of Birth */}
                <div className="sm:col-span-2">
                  <DatePicker
                    title="Ngày sinh"
                    placeholder="Chọn ngày sinh"
                    name="dob"
                    type="text"
                    control={control}
                    formState={formState}
                    className="w-full py-2 lg:py-2.5 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 lg:pt-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                size="lg"
                className="flex-1 w-full text-sm lg:text-base"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                loading={loadingUpdateProfile}
                disabled={
                  loadingUpdateProfile ||
                  !formState.isDirty ||
                  (formState.isSubmitted && !formState.isValid)
                }
                size="lg"
                className="flex-1 w-full text-sm lg:text-base"
              >
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePopup
