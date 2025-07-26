import api from "@/services/api"
import { handleErrors } from "@/utils/errors"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  IChangePasswordRequestDto,
  IUpdateUserProfileRequestDto,
  IUserProfileWithTokenDto,
} from "./dtos/profile.dto"

/**
 * Get user profile - GET /v1/user/profile
 */
export const getUserProfile = createAsyncThunk<IUserProfileWithTokenDto>(
  "user/get-profile",
  async () => {
    try {
      const res = await api.get("/v1/user/profile")
      if (res.data && Object.keys(res.data).length > 0) {
        return res.data.data
      }
      return null
    } catch (e: any) {
      handleErrors(e, "Lấy thông tin profile thất bại")
      throw e
    }
  }
)

/**
 * Update user profile - PUT /v1/user/profile
 */
export const updateUserProfile = createAsyncThunk<
  IUserProfileWithTokenDto,
  IUpdateUserProfileRequestDto
>("user/update-profile", async (payload) => {
  try {
    const res = await api.put("/v1/user/profile", payload)
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data.data
    }
    return null
  } catch (e: any) {
    handleErrors(e, "Cập nhật profile thất bại")
    throw e
  }
})

/**
 * Change user password - PUT /v1/user/password
 */
export const changePassword = createAsyncThunk<
  boolean,
  IChangePasswordRequestDto
>("user/change-password", async (payload) => {
  try {
    const res = await api.put("/v1/user/password", payload)
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data.data
    }
    return res
  } catch (e: any) {
    handleErrors(e, "Đổi mật khẩu thất bại")
    throw e
  }
})
