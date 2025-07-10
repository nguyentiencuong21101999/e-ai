"use client"

import Button from "@/components/Common/Button"
import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons"
import React, { useState } from "react"

interface ProductDetailData {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  images?: string[]
  description?: string
  seller?: {
    name: string
    rating: number
    location: string
  }
  selectedColor?: string
  selectedSize?: string
}

interface ProductDetailPopupProps {
  isOpen: boolean
  onClose: () => void
  product: ProductDetailData | null
}

/**
 * ProductDetail popup component
 * Hiển thị chi tiết sản phẩm giống ProductSearch ProductDisplay
 */
const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const calculateDiscount = () => {
    if (!product?.originalPrice) return 0
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 999) {
      setQuantity(newQuantity)
    }
  }

  if (!isOpen || !product) return null

  // Generate multiple images for slide
  const productImages = product.images || [
    product.image,
    product.image.replace("random=1", "random=11"),
    product.image.replace("random=1", "random=12"),
    product.image.replace("random=1", "random=13"),
  ]

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      aria-labelledby="product-detail-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm animate-fade-in will-change-auto"
        onClick={onClose}
        style={{ backfaceVisibility: "hidden" }}
      ></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div
          className="relative w-full max-w-6xl bg-white rounded-lg sm:rounded-2xl shadow-2xl transform transition-all duration-500 ease-out animate-scale-in max-h-[95vh] overflow-y-auto will-change-transform"
          style={{
            backfaceVisibility: "hidden",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-out hover:scale-110 will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <ShoppingCartOutlined className="text-white text-lg" />
              </div>
              <div>
                <h2
                  id="product-detail-title"
                  className="text-xl font-bold text-heading-light"
                >
                  Thông tin sản phẩm
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                  Chi tiết sản phẩm từ giỏ hàng
                </p>
              </div>
            </div>
          </div>

          {/* Content - Exact copy of ProductDisplay */}
          <div
            className="px-8 py-8 transition-all duration-300 ease-out will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[500px]">
              {/* Enhanced Image Section */}
              <div className="space-y-4 h-full flex flex-col">
                <div className="relative group">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Modern Image navigation */}
                  {productImages.length > 1 && (
                    <div className="flex gap-3 mt-4 justify-center">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                            index === currentImageIndex
                              ? "ring-2 ring-orange-500 shadow-lg scale-110"
                              : "hover:scale-105 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={productImages[index]}
                            alt={`${product.name} ${index + 1}`}
                            className="w-16 h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info Section */}
              <div className="space-y-5 h-full flex flex-col">
                {/* Product Name */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-heading leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Price and Stock */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-red-600">
                      {formatPrice(product.price)}₫
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}₫
                        </span>
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          -{calculateDiscount()}%
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-medium">
                      Có trong giỏ hàng: {product.quantity} sản phẩm
                    </span>
                  </div>
                </div>

                {/* Product Type */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-heading-light">
                    Loại:
                  </span>
                  <div className="text-gray-900">Áo thun cotton cao cấp</div>
                </div>

                {/* Product Variants */}
                <div className="space-y-4">
                  {/* Color Selection - Only show selected */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-heading-light">
                      Màu sắc:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button className="px-3 py-1.5 rounded-lg border border-orange-500 bg-orange-50 text-orange-600 text-sm font-medium">
                        {product.selectedColor || "Đen"}
                      </button>
                    </div>
                  </div>

                  {/* Size Selection - Only show selected */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-heading-light">
                      Kích cỡ:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button className="w-10 h-10 rounded-lg border border-orange-500 bg-orange-50 text-orange-600 text-sm font-medium">
                        {product.selectedSize || "M"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-heading-light">
                    Nhà bán:
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 font-medium">
                      {product.seller?.name || "Fashion Store Official"}
                    </span>
                    {product.seller?.rating && (
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                        <StarFilled className="text-yellow-500 text-sm" />
                        <span className="text-sm font-medium text-yellow-700">
                          {product.seller.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3 mt-auto">
                  <label className="text-sm font-medium text-heading-light">
                    Số lượng:
                  </label>
                  <div className="flex items-center bg-white rounded-lg border border-gray-200 w-fit">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-l-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-medium text-gray-700"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className="w-16 h-10 text-center border-0 focus:outline-none text-gray-900 font-medium"
                      min="1"
                      max="999"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 999}
                      className="w-10 h-10 rounded-r-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-medium text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons for Product View */}
            <div className="flex gap-3 pt-6 mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-700 hover:border-orange-400"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Quay lại</span>
                </div>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onClose()
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingCartOutlined />
                  <span>Cập nhật giỏ</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPopup
