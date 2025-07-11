"use client"

import Button from "@/components/Common/Button"
import DatePicker from "@/components/Common/DatePicker"
import {
  HiddenPasswordIcon,
  VisiblePasswordIcon,
} from "@/components/Common/Icons"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import { handleSignUp } from "@/redux/features/auth/action"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
import { useForm } from "react-hook-form"
import { LuInfo } from "react-icons/lu"
import { MdManageAccounts } from "react-icons/md"
import * as yup from "yup"

interface FormSignUp {
  username: string
  email: string
  password: string
  confirmPassword: string | undefined
  fullName: string
  phoneNumber: string | undefined
  dob: string | undefined
}

interface FormSignUpProps {
  isPopup?: boolean
  onClosePopup?: () => void
  onSwitchToSignIn?: () => void
}

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên người dùng")
    .matches(
      /^(?=[a-zA-Z0-9.@_-]{6,48}$)([a-zA-Z0-9]([.@_-]?[a-zA-Z0-9])*)$/,
      "Tên người dùng không hợp lệ"
    ),
  email: yup
    .string()
    .max(64, "Email không hợp lệ")
    .email("Email không hợp lệ")
    .trim()
    .required("Vui lòng nhập email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email Không hợp lệ"
    ),
  password: yup.string().max(32).required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  fullName: yup.string().trim().required("Vui lòng nhập họ và tên"),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^(0|\\+)[0-9]{8,14}$/, {
      excludeEmptyString: true,
      message: "Số điện thoại không hợp lệ",
    }),
  dob: yup.string().trim(),
})

export const FormSignUp: React.FC<FormSignUpProps> = ({
  isPopup = false,
  onClosePopup,
  onSwitchToSignIn,
}) => {
  const dispatch = useAppDispatch()
  const { loadingSignup, profile } = useAppSelector(
    (state) => state.authReducer
  )
  const accessToken = profile?.accessToken
  const { control, handleSubmit, formState, watch } = useForm<FormSignUp>({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const router = useRouter()
  const onSubmitHandler = async (formData: FormSignUp) => {
    const res = await dispatch(handleSignUp(formData)).unwrap()

    if (!res) return
    showToast("Đăng ký thành công!", "success")
    if (isPopup && onClosePopup) {
      onClosePopup()
    } else {
      router.push("/")
    }
  }

  useLayoutEffect(() => {
    if (accessToken && !isPopup) router.push("/")
  }, [accessToken, router, isPopup])

  const formContent = (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`w-full ${
          isPopup
            ? "min-w-[320px] max-w-[1005px]"
            : "h-[90vh] max-w-[90vw] md:max-w-[1440px]"
        } flex items-stretch bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden ${
          isPopup ? "max-h-[95vh] min-h-[750px]" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`w-full ${
            isPopup ? "py-4 lg:py-6" : "h-full"
          } flex items-center justify-center mx-auto px-4 md:px-0 ${
            isPopup ? "overflow-y-auto" : ""
          }`}
        >
          <div className="w-full max-w-2xl h-full bg-white rounded-lg sm:rounded-2xl py-4 px-4 md:p-6 lg:p-8 flex flex-col justify-center">
            {/* Brand Section */}
            <div className="text-center mb-6 lg:mb-8">
              <div className="text-xl lg:text-2xl font-bold text-heading-light mb-3">
                Đăng ký tài khoản
              </div>
              <p className="text-base lg:text-lg text-gray-700 font-medium">
                Tạo tài khoản để bắt đầu với TaoBao1688
              </p>
            </div>

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
                  <div>
                    <InputField
                      title="Tên đăng nhập"
                      placeholder="Nhập tên đăng nhập"
                      name="username"
                      type="text"
                      control={control}
                      formState={formState}
                      className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                    />
                  </div>
                  <div>
                    <InputField
                      title="Email"
                      placeholder="Nhập email của bạn"
                      name="email"
                      type="text"
                      control={control}
                      formState={formState}
                      className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                    />
                  </div>
                  <div>
                    <InputField
                      title="Mật khẩu"
                      placeholder="Nhập mật khẩu"
                      name="password"
                      type="password"
                      control={control}
                      formState={formState}
                      className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                      hidePasswordIcon={<HiddenPasswordIcon />}
                      showPasswordIcon={<VisiblePasswordIcon />}
                    />
                  </div>
                  <div>
                    <InputField
                      title="Xác nhận mật khẩu"
                      placeholder="Nhập lại mật khẩu"
                      name="confirmPassword"
                      type="password"
                      disabled={!watch("password")}
                      control={control}
                      formState={formState}
                      className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                      hidePasswordIcon={<HiddenPasswordIcon />}
                      showPasswordIcon={<VisiblePasswordIcon />}
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
                  <div>
                    <InputField
                      title="Họ tên"
                      placeholder="Nhập họ và tên"
                      name="fullName"
                      type="text"
                      control={control}
                      formState={formState}
                      className="w-full py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                    />
                  </div>
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

              {/* Submit Button */}
              <div className="pt-2 lg:pt-4">
                <Button
                  type="submit"
                  loading={loadingSignup}
                  disabled={!formState.isValid}
                  size="lg"
                  className="w-full text-base lg:text-lg"
                >
                  Đăng ký tài khoản
                </Button>
              </div>

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

              <div className="text-center pb-4 lg:pb-0">
                <span className="text-sm text-gray-800 font-medium">
                  Đã có tài khoản?{" "}
                </span>
                {isPopup && onSwitchToSignIn ? (
                  <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-300"
                  >
                    Đăng nhập ngay
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-300"
                  >
                    Đăng nhập ngay
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  if (isPopup) {
    return !accessToken ? formContent : null
  }

  return !accessToken && formContent
}
