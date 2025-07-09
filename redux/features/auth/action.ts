import { IResponseDataDto } from "@/base/dto/common.dto"
import api from "@/services/api"
import { handleErrors } from "@/utils/errors"
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { ISignInRequestDto, ISignInResponseDto } from "./dtos/sign-in.dto"
import { ISignUpRequestDto } from "./dtos/sign-up.dto"
import { ISetPasswordRequestDto } from "./dtos/verify.dto"

export const handleSignUp = createAsyncThunk<ISignInResponseDto, ISignUpRequestDto>(
  "auth/sign-up",
  async (payload) => {
    try {
      const res = await api.post("/v1/user/sign-up", payload)
      if (res.data && Object.keys(res.data).length > 0) return res.data.data
      return null
    } catch (e: any) {
      handleErrors(e, "Tạo người dùng thất bại")
    }
  }
)

export const handleSignIn = createAsyncThunk<ISignInResponseDto, ISignInRequestDto>(
  "auth/sign-in",
  async (payload) => {
    try {
      const res = await api.post("/v1/user/sign-in", payload)
      if (res.data && Object.keys(res.data).length > 0) {
        return res.data.data
      }
      return res
    } catch (e: any) {
      handleErrors(e, "Đăng nhập thất bại")
      return
    }
  }
)

export const handleSignOut = createAsyncThunk<boolean>(
  "auth/sign-out",
  async (payload) => {
    try {
      const res = await api.post("/v1/user/sign-out", payload)
      if (res.data) {
        return res.data.data
      }
      return res
    } catch (e: any) {
      handleErrors(e, "Đăng xuất thất bại")
      return
    }
  }
)

export const setNewPassword = createAsyncThunk<
  IResponseDataDto | string | undefined,
  ISetPasswordRequestDto
>("auth/set-new-password", async (payload) => {
  try {
    const res = await api.post(`/users/forgot-password`, {
      ...payload,
    })

    if (res.data) {
      return res.data
    }
  } catch (error: any) {
    const message: unknown = error?.response?.data?.error?.message
    return typeof message === "string" ? message : undefined
  }
})

export const handleClearAuth = createAction<void, "auth/clear">("auth/clear")
