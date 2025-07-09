"use client"

import Button from "@/components/Common/Button"
import {
    DeleteOutlined,
    EyeOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons"
import React, { useEffect, useRef, useState } from "react"
import ProductDetailPopup from "./ProductDetailPopup"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  originalPrice?: number
}

/**
 * CartList component
 * Hiển thị danh sách sản phẩm trong giỏ hàng
 */
const CartList: React.FC = () => {
  // Add CSS animation keyframes
  React.useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])
  // State management for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Áo thun cotton cao cấp unisex form rộng phong cách Hàn Quốc",
      price: 189000,
      originalPrice: 250000,
      quantity: 2,
      image: "https://picsum.photos/400/400?random=1",
    },
    {
      id: "2",
      name: "Quần jeans nam nữ baggy oversize phong cách vintage",
      price: 299000,
      originalPrice: 399000,
      quantity: 1,
      image: "https://picsum.photos/400/400?random=2",
    },
    {
      id: "3",
      name: "Giày sneaker thể thao nam nữ màu trắng basic",
      price: 450000,
      quantity: 1,
      image: "https://picsum.photos/400/400?random=3",
    },
    {
      id: "4",
      name: "Giày sneaker thể thao nam nữ màu trắng basic",
      price: 450000,
      quantity: 1,
      image: "https://picsum.photos/400/400?random=3",
    },
  ])

  // State for product detail popup
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null)

  // State for checkout position behavior
  const [isCheckoutFixed, setIsCheckoutFixed] = useState(true)

  // Refs for scroll calculation
  const containerRef = useRef<HTMLDivElement>(null)
  const checkoutRef = useRef<HTMLDivElement>(null)

  // Effect to handle scroll behavior for checkout section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current

      // Get container's bottom position relative to viewport
      const containerRect = container.getBoundingClientRect()

      // Use consistent height for calculation to avoid dependency issues
      const checkoutHeight = 140

      // Calculate if we should show fixed checkout
      // Fixed when there's still content below the fold that needs checkout access
      const distanceToBottom = containerRect.bottom - window.innerHeight
      const shouldBeFixed = distanceToBottom > checkoutHeight - 40 // 40px buffer

      setIsCheckoutFixed(shouldBeFixed)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)
    // Also check on resize
    window.addEventListener("resize", handleScroll)

    // Initial check with small delay to ensure DOM is ready
    setTimeout(handleScroll, 200)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [cartItems])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const handleViewDetail = (id: string) => {
    const product = cartItems.find((item) => item.id === id)
    if (product) {
      // Transform cart item to product detail data with additional info
      const productDetailData = {
        ...product,
        images: [
          product.image,
          product.image.replace("random=1", "random=11"),
          product.image.replace("random=1", "random=12"),
          product.image.replace("random=1", "random=13"),
        ],
        selectedColor: "Đen",
        selectedSize: "M",
        seller: {
          name: "Fashion Store Official",
          rating: 4.8,
          location: "Hàng Châu, Trung Quốc",
        },
      }
      setSelectedProduct(productDetailData)
      setIsDetailPopupOpen(true)
    }
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-24 h-24 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-heading-light mb-2">
          Giỏ hàng trống
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <Button
          variant="primary"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
        >
          Tiếp tục mua sắm
        </Button>
      </div>
    )
  }

  return (
    <>
      <div ref={containerRef} className="pb-32 lg:pb-6">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02] opacity-0"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 75}ms forwards`,
              }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-heading-light mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold text-orange-600">
                      {formatPrice(item.price)}đ
                    </span>
                    {item.originalPrice && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}đ
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                          -{calculateDiscount(item.originalPrice, item.price)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <MinusOutlined className="text-black" />
                      </button>
                      <span className="px-4 py-21 font-medium min-w-[3rem] text-base text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <PlusOutlined className="text-black" />
                      </button>
                    </div>

                    <div className="bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                      <span className="text-sm font-bold text-heading-light">
                        Tổng:
                      </span>
                      <span className="text-base font-bold text-orange-600 ml-1">
                        {formatPrice(item.price * item.quantity)}đ
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetail(item.id)}
                      className="border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600"
                    >
                      <EyeOutlined className="mr-1" />
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="border-red-300 text-red-600 hover:border-red-500 hover:text-red-700"
                    >
                      <DeleteOutlined className="mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary - Static */}
        <div className="bg-white border-t border-gray-200 mt-6 lg:bg-orange-50 lg:border lg:border-orange-200 lg:rounded-lg lg:p-6 lg:border-t-orange-200">
          <div className="px-4 py-4 lg:px-0 lg:py-0">
            <div className="flex justify-between items-center mb-3 lg:mb-4">
              <span className="text-base font-semibold text-heading-light lg:text-lg">
                <span className="lg:hidden">
                  Tổng cộng ({getTotalQuantity()} SP):
                </span>
                <span className="hidden lg:inline">
                  Tổng cộng ({getTotalQuantity()} sản phẩm):
                </span>
              </span>
              <span className="text-xl font-bold text-orange-600 lg:text-2xl">
                {formatPrice(getTotalPrice())}đ
              </span>
            </div>
            <div className="flex gap-6">
              <Button
                variant="outline"
                className="flex-1 border-orange-500 text-orange-600 hover:border-orange-600 py-3 lg:py-2 transition-all duration-300"
              >
                <span className="lg:hidden">Tiếp tục mua</span>
                <span className="hidden lg:inline">Tiếp tục mua sắm</span>
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 lg:py-2 transition-all duration-300"
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary - Fixed */}
      <div
        ref={checkoutRef}
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 lg:bg-orange-50 lg:border-orange-200 transition-all duration-500 ease-out ${
          isCheckoutFixed
            ? "opacity-100 translate-y-0 scale-100 visible"
            : "opacity-0 translate-y-full scale-95 invisible"
        }`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDelay: isCheckoutFixed ? "50ms" : "0ms",
        }}
      >
        <div className="mx-auto px-4 py-4 lg:px-6 lg:py-4">
          <div
            className={`flex justify-between items-center mb-3 lg:mb-4 transition-all duration-300 delay-100 ${
              isCheckoutFixed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-base font-semibold text-heading-light lg:text-lg">
              <span className="lg:hidden">
                Tổng cộng ({getTotalQuantity()} SP):
              </span>
              <span className="hidden lg:inline">
                Tổng cộng ({getTotalQuantity()} sản phẩm):
              </span>
            </span>
            <span className="text-xl font-bold text-orange-600 lg:text-2xl">
              {formatPrice(getTotalPrice())}đ
            </span>
          </div>
          <div
            className={`flex gap-6 transition-all duration-300 delay-200 ${
              isCheckoutFixed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              variant="outline"
              className="flex-1 border-orange-500 text-orange-600 hover:border-orange-600 py-3 lg:py-2 transition-all duration-300 hover:scale-105"
            >
              <span className="lg:hidden">Tiếp tục mua</span>
              <span className="hidden lg:inline">Tiếp tục mua sắm</span>
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 lg:py-2 transition-all duration-300 hover:scale-105"
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>

      {/* Product Detail Popup */}
      <ProductDetailPopup
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
        product={selectedProduct}
      />
    </>
  )
}

export default CartList
