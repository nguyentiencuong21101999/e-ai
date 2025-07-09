"use client"

import Button from "@/components/Common/Button"
import {
  HiddenPasswordIcon,
  VisiblePasswordIcon,
} from "@/components/Common/Icons"
import InputField from "@/components/Common/Input"
import { showToast } from "@/components/Common/Toast"
import { handleSignIn } from "@/redux/features/auth/action"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLayoutEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

interface FormLogin {
  username: string
  password: string
}

interface FormSignInProps {
  isPopup?: boolean
  onClosePopup?: () => void
  onSwitchToSignUp?: () => void
  onSwitchToForgotPassword?: () => void
}

const schema = yup.object().shape({
  username: yup.string().trim().required("Vui lòng nhập tên người dùng"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
})

export const FormSignIn: React.FC<FormSignInProps> = ({
  isPopup = false,
  onClosePopup,
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}) => {
  const dispatch = useAppDispatch()
  const { loadingSignIn, profile } = useAppSelector(
    (state) => state.authReducer
  )
  const accessToken = profile?.accessToken
  const { control, handleSubmit, formState } = useForm<FormLogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const router = useRouter()
  const onSubmitHandler = async (formData: FormLogin) => {
    const { username, password } = formData
    const res = await dispatch(
      handleSignIn({
        username,
        password,
      })
    ).unwrap()

    if (!res) return
    showToast("Đăng nhập thành công!", "success")
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
          isPopup ? "min-w-[320px]" : "h-[90vh] max-w-[90vw] md:max-w-[1440px]"
        } flex items-center bg-white rounded-2xl shadow-xl overflow-hidden`}
      >
        {/* Left Section - Image and Branding */}
        <div className="hidden lg:flex lg:w-[55%] h-full relative pl-5">
          <div className="w-full h-full  relative rounded-l-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
            <div className="absolute inset-0 ">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1635405074683-96d6921a2a68?q=80&w=2070&auto=format&fit=crop"
                alt="Orange Theme Ecommerce Background"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="relative w-full h-full flex flex-col justify-center px-8 py-20 backdrop-blur-[2px]">
              <div className="animate-fade-in space-y-6">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Chào mừng đến với
                  <br />
                  <span className="text-orange-200">TaoBao1688</span>
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  Nền tảng nhập hàng trực tiếp từ Trung Quốc
                  <br />
                  uy tín nhất Việt Nam
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-6 animate-slide-up animation-delay-200">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="text-3xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors">
                    50K+
                  </div>
                  <div className="text-sm text-white/90 font-medium">
                    Khách hàng tin dùng
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="text-3xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors">
                    100K+
                  </div>
                  <div className="text-sm text-white/90 font-medium">
                    Đơn hàng thành công
                  </div>
                </div>
              </div>
              <div className=" bottom-8 left-12 right-12 mt-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">
                    Được tin tưởng bởi hàng nghìn khách hàng trên toàn quốc
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div
          className={`w-full lg:w-[45%] ${
            isPopup ? "py-4 lg:py-6" : "h-full"
          } flex items-center justify-center mx-auto px-4 md:px-0`}
        >
          <div className="w-full max-w-md h-full bg-white rounded-2xl py-4 px-4 md:p-10 flex flex-col justify-center">
            {/* Brand Section - Moved inside form */}
            <div className="text-center mb-12 ml-2">
              <div className="text-xl font-bold text-heading-light mb-3">
                Đăng nhập
              </div>
              <p className="text-lg text-gray-900 font-medium">
                Đăng nhập để tiếp tục với TaoBao1688
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div>
                  <InputField
                    title="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập của bạn"
                    name="username"
                    type="text"
                    control={control}
                    formState={formState}
                    className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                  />
                </div>

                <div>
                  <InputField
                    title="Mật khẩu"
                    placeholder="Nhập mật khẩu của bạn"
                    name="password"
                    type="password"
                    control={control}
                    formState={formState}
                    className="w-full py-3 px-4 rounded-xl border focus:border-orange-500 text-sm bg-gray-50/50 placeholder:text-sm"
                    hidePasswordIcon={<HiddenPasswordIcon />}
                    showPasswordIcon={<VisiblePasswordIcon />}
                  />
                  <div className="flex justify-end mt-2">
                    {isPopup && onSwitchToForgotPassword ? (
                      <button
                        type="button"
                        onClick={onSwitchToForgotPassword}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-all duration-300"
                      >
                        Quên mật khẩu?
                      </button>
                    ) : (
                      <Link
                        href="/forget-password"
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-all duration-300"
                      >
                        Quên mật khẩu?
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  loading={loadingSignIn}
                  disabled={!formState.isValid}
                  size="lg"
                  className="w-full text-lg"
                >
                  Đăng nhập
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

              <div className="text-center">
                <span className="text-sm text-gray-800 font-medium">
                  Chưa có tài khoản?{" "}
                </span>
                {isPopup && onSwitchToSignUp ? (
                  <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-300"
                  >
                    Tạo ngay
                  </button>
                ) : (
                  <Link
                    href="/sign-up"
                    className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-all duration-300"
                  >
                    Tạo ngay
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
