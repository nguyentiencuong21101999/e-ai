"use client"

import { getUserProfile, updateUserProfile } from "@/redux/features/user/action"
import { IUpdateUserProfileRequestDto } from "@/redux/features/user/dtos/profile.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"

/**
 * Custom hook for user profile management
 * Provides easy access to user profile state and actions
 */
export const useUserProfile = () => {
  const dispatch = useAppDispatch()
  const { profile, loadingGetProfile, loadingUpdateProfile } = useAppSelector(
    (state) => state.userReducer
  )

  /**
   * Fetch user profile from API
   */
  const fetchProfile = async () => {
    try {
      const result = await dispatch(getUserProfile()).unwrap()
      return result
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      throw error
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (profileData: IUpdateUserProfileRequestDto) => {
    try {
      const result = await dispatch(updateUserProfile(profileData)).unwrap()
      return result
    } catch (error) {
      console.error("Failed to update user profile:", error)
      throw error
    }
  }

  return {
    // State
    profile,
    loadingGetProfile,
    loadingUpdateProfile,
    
    // Actions
    fetchProfile,
    updateProfile,
  }
} 