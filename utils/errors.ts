import { showToast } from "@/components/Common/Toast"

export interface ErrorRes {
  code: string
  message: string
}

const Errors: { [key: string]: string } = {
  "error.default": "Lỗi hệ thống",
  "error.usernameExisted": "Tên người dùng đã tồn tại",
  "error.accountInvalid": "Tên người dùng hoặc mật khẩu không đúng",
  "error.emailExisted": "Email đã tồn tại",
  "error.phoneNumbers": "Số điện thoại đã tồn tại",
}

export const handleErrors = (error: any, errorMessage: string) => {
  const err = error?.response?.data?.error
  let msg = Errors["error.default"]
  if (err?.code) {
    msg = Errors[err.code] || errorMessage
  }
  showToast(msg, "error")
}
