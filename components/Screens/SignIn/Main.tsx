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
          isPopup
            ? "min-w-[320px] max-w-[600px]"
            : "h-[90vh] max-w-[90vw] md:max-w-[600px]"
        } flex items-center bg-white rounded-2xl shadow-xl overflow-hidden`}
      >
        {/* Form Section - Full Width */}
        <div
          className={`w-full ${
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
                Đăng nhập để tiếp tục với EAI
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
                    disabled={loadingSignIn || (formState.isSubmitted && !formState.isValid)}
                    size="lg"
                    className="w-full text-md"
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
