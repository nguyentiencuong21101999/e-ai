"use client"

import { handleClearAuth, handleSignOut } from "@/redux/features/auth/action"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getFirstLetterOfLastName } from "@/utils/helpers"
import React, { useState } from "react"
import {
  IoMdKey,
  IoMdLogOut,
  IoMdNotifications,
  IoMdPerson
} from "react-icons/io"
import { IoChevronDown } from "react-icons/io5"
import { showToast } from "../Common/Toast"
import ChangePasswordPopup from "../Screens/Popups/ChangePasswordPopup"
import UserProfilePopup from "../Screens/Popups/UserProfilePopup"

interface UserDropdownProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  isHeaderVisible: boolean
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  isOpen,
  onToggle,
  onClose,
  isHeaderVisible,
}) => {
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.authReducer)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const res = await dispatch(handleSignOut()).unwrap()
      if (!res) return

      dispatch(handleClearAuth())
      showToast("Đăng xuất thành công!", "success")
      onClose()
    } catch (error) {
      showToast("Đăng xuất thất bại!", "error")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true)
    onClose()
  }

  const handleViewProfile = () => {
    setIsUserProfileOpen(true)
    onClose()
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(balance)
  }

  const menuItems = [
    {
      icon: IoMdPerson,
      label: "Thông tin cá nhân",
      action: handleViewProfile,
      className: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      icon: IoMdKey,
      label: "Đổi mật khẩu",
      action: handleChangePassword,
      className: "hover:bg-purple-50 hover:text-purple-600",
    },
    {
      icon: IoMdNotifications,
      label: "Cài đặt thông báo",
      action: () => showToast("Chức năng thông báo sẽ được cập nhật!", "info"),
      className: "hover:bg-pink-50 hover:text-pink-600",
    },
  ]

  return (
    <>
      <div className="ml-2 relative" data-user-dropdown>
        {/* User Avatar Button với animation */}
        <button
          onClick={onToggle}
          className="flex items-center gap-2  text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105 rounded-lg hover:bg-orange-50 group"
        >
          <div className="relative">
            <div className="w-[35px] h-[35px] rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold text-lg animate-pulse-slow group-hover:animate-bounce-subtle">
              {getFirstLetterOfLastName(profile?.fullName)}
            </div>
            {profile?.isEmailVerified && (
              <div className="absolute  w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </div>
          <div className="hidden  md:hidden flex-col items-start">
            <span className="text-[15px] font-medium group-hover:text-orange-600 text-heading-light transition-colors">
              {profile?.fullName || "Tài khoản"}
            </span>
            <span className="text-[15px] text-heading-light group-hover:text-orange-500 transition-colors">
              {profile?.balance ? formatBalance(profile.balance) : "0 VND"}
            </span>
          </div>
          <IoChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:translate-y-0.5 ${
              isOpen ? "rotate-180 text-orange-500" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Dropdown Content */}
            <div className="absolute top-full right-0 z-[160] mt-2 w-80 animate-scale-in origin-top-right">
              <div className=" border bg-white  border-gray-200 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* User Info Header với gradient */}
                <div className="bg-gradient-to-r from-orange-300 to-orange-400 text-white p-6 animate-slide-down">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-[50px] h-[50px] rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold text-2xl animate-float">
                        {getFirstLetterOfLastName(profile?.fullName)}
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-300 rounded-full border-2 border-white animate-heart-beat"></div>
                    </div>
                    <div className="flex-1 animate-fade-in animation-delay-100">
                      <h3 className="font-bold text-lg text-white">
                        {profile?.fullName || "User"}
                      </h3>
                      <p className="text-white text-sm mb-1">
                        {profile?.email || "user@example.com"}
                      </p>
                      <div className="flex items-center gap-2"></div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col bg-white">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="pl-[33px] py-[12px] hover:bg-orange-50 duration-300 text-[#2C3345] hover:text-orange-600 text-left flex items-center gap-3 group animate-slide-in-left"
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                    >
                      <item.icon className="w-5 h-5 text-[#2C3345] group-hover:text-orange-600 duration-300" />
                      <span className="text-[15px] font-medium leading-normal">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Logout Button */}
                <div className="border-t border-gray-100 bg-white">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="pl-[33px] py-[12px] hover:bg-red-50 duration-300 text-[#2C3345] hover:text-red-600 text-left flex items-center gap-3 w-full group animate-slide-in-left"
                    style={{
                      animationDelay: `${(menuItems.length + 1) * 50}ms`,
                    }}
                  >
                    <IoMdLogOut
                      className={`w-5 h-5 text-[#2C3345] group-hover:text-red-600 duration-300 ${
                        isLoggingOut ? "animate-spin" : ""
                      }`}
                    />
                    <span className="text-[15px] font-medium leading-normal">
                      {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Change Password Popup */}
      <ChangePasswordPopup
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* User Profile Popup */}
      <UserProfilePopup
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </>
  )
}

export default UserDropdown
