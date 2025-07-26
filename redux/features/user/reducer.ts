import { createReducer } from "@reduxjs/toolkit"
import { changePassword, getUserProfile, updateUserProfile } from "./action"
import { userDefaultReducer } from "./dtos/reducer-state.dto"

const userReducer = createReducer(userDefaultReducer, (builder) => {
  builder
    // Get user profile
    .addCase(getUserProfile.pending, (state) => {
      state.loadingGetProfile = true
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
      state.loadingGetProfile = false
      state.profile = action.payload
    })
    .addCase(getUserProfile.rejected, (state) => {
      state.loadingGetProfile = false
    })

    // Update user profile
    .addCase(updateUserProfile.pending, (state) => {
      state.loadingUpdateProfile = true
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loadingUpdateProfile = false
      state.profile = action.payload
    })
    .addCase(updateUserProfile.rejected, (state) => {
      state.loadingUpdateProfile = false
    })

    // Change password
    .addCase(changePassword.pending, (state) => {
      state.loadingChangePassword = true
    })
    .addCase(changePassword.fulfilled, (state) => {
      state.loadingChangePassword = false
    })
    .addCase(changePassword.rejected, (state) => {
      state.loadingChangePassword = false
    })
})

export default userReducer 