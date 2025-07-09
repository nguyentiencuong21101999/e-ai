"use client"

import React from "react"
import CartList from "./CartList"

/**
 * Cart screen component
 * Hiển thị giỏ hàng của người dùng
 */
const Cart: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-heading-light">
            Giỏ hàng
          </h1>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CartList />
        </div>
      </div>
    </div>
  )
}

export default Cart
