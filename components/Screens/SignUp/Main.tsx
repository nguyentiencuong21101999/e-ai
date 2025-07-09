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
        {/* Left Section - Image and Branding */}
        <div className="hidden lg:flex lg:w-[50%] min-h-full relative pl-6 py-12">
          <div className="w-full min-h-[90%] relative rounded-l-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex flex-col">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1635405074683-96d6921a2a68?q=80&w=2070&auto=format&fit=crop"
                alt="Orange Theme Ecommerce Background"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="relative flex-1 flex flex-col justify-center px-8 py-8 backdrop-blur-[2px]">
              <div className="flex-1 flex flex-col justify-center">
                <div className="animate-fade-in space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                      Tham gia cùng
                      <br />
                      <span className="text-orange-200">TaoBao1688</span>
                    </h2>
                    <p className="text-xl text-white/95 leading-relaxed font-medium">
                      Khởi đầu hành trình kinh doanh của bạn
                      <br />
                      với nền tảng nhập hàng uy tín nhất
                    </p>
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-6 animate-slide-up animation-delay-200">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="text-2xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                      Miễn phí
                    </div>
                    <div className="text-sm text-white/90 font-medium">
                      Đăng ký tài khoản
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="text-2xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                      24/7
                    </div>
                    <div className="text-sm text-white/90 font-medium">
                      Hỗ trợ khách hàng
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex items-center space-x-2 text-white/90">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">
                      Tham gia cùng hàng nghìn doanh nghiệp khác
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div
          className={`w-full lg:w-[50%] ${
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
