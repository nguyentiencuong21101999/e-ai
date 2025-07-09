import { createReducer } from "@reduxjs/toolkit"
import {
  handleClearAuth,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "./action"
import { authDefaultReducer } from "./dtos/reducer-state.dto"

const authReducer = createReducer(authDefaultReducer, (builder) => {
  builder
    /*sign-up */
    .addCase(handleSignUp.pending, (state) => {
      state.loadingSignup = true
    })
    .addCase(handleSignUp.fulfilled, (state, action) => {
      state.loadingSignup = false
      state.profile = action.payload
    })
    .addCase(handleSignUp.rejected, (state, action) => {
      state.loadingSignup = false
    })
    /*sign-in */
    .addCase(handleSignIn.pending, (state, action) => {
      state.loadingSignIn = true
    })
    .addCase(handleSignIn.fulfilled, (state, action) => {
      state.loadingSignIn = false
      state.profile = action.payload
    })
    .addCase(handleSignIn.rejected, (state) => {
      state.loadingSignIn = false
    })
    /*clear auth */
    .addCase(handleClearAuth, (state) => {
      state.loadingSignIn = false
      state.loadingSignup = false
      state.profile = {} as any
    })

    /*sign-out */
    .addCase(handleSignOut.pending, (state, action) => {
      state.loadingSignOut = true
    })
    .addCase(handleSignOut.fulfilled, (state, action) => {
      state.loadingSignOut = false
    })
    .addCase(handleSignOut.rejected, (state) => {
      state.loadingSignOut = false
    })
})

export default authReducer
