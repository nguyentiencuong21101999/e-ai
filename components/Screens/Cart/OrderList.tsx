"use client"

import React from "react"

/**
 * OrderList component  
 * Hiển thị danh sách đơn hàng đã mua
 */
const OrderList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-heading-light mb-4">
          Đơn mua
        </h2>
        <p className="text-gray-600">
          Đây là nội dung của tab Đơn mua
        </p>
      </div>
    </div>
  )
}

export default OrderList 