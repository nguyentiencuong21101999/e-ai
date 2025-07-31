"use client"

import { TranslationDirection } from "@/mockup/translationData"
import { ReloadOutlined, SwapOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { motion } from "framer-motion"

interface TranslationTypeSelectorProps {
  selectedDirection: TranslationDirection | null
  onDirectionChange: (direction: TranslationDirection) => void
  onRandomText?: () => void
  isGeneratingRandom?: boolean
}

const TranslationTypeSelector: React.FC<TranslationTypeSelectorProps> = ({
  selectedDirection,
  onDirectionChange,
  onRandomText,
  isGeneratingRandom = false,
}) => {
  const currentDirection = selectedDirection || TranslationDirection.VI_TO_EN

  const handleSwapDirection = () => {
    const newDirection = currentDirection === TranslationDirection.VI_TO_EN 
      ? TranslationDirection.EN_TO_VI 
      : TranslationDirection.VI_TO_EN
    onDirectionChange(newDirection)
  }

  const getDirectionDisplay = () => {
    if (currentDirection === TranslationDirection.VI_TO_EN) {
      return {
        from: { flag: "🇻🇳", lang: "VI" },
        to: { flag: "🇺🇸", lang: "EN" }
      }
    } else {
      return {
        from: { flag: "🇺🇸", lang: "EN" },
        to: { flag: "🇻🇳", lang: "VI" }
      }
    }
  }

  const direction = getDirectionDisplay()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4"
    >
      {/* Translation Direction Selector */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
        <div className="flex items-center gap-3">
          {/* From Language */}
          <div className="text-center">
            <div className="text-lg">{direction.from.flag}</div>
            <div className="text-xs font-medium text-heading-light">
              {direction.from.lang}
            </div>
          </div>

          {/* Swap Button */}
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<SwapOutlined />}
            onClick={handleSwapDirection}
            className="bg-pink-500 hover:bg-pink-600 border-pink-500 hover:border-pink-600 transition-all duration-300 hover:scale-110"
            style={{
              background: '#ec4899',
              borderColor: '#ec4899',
            }}
          />

          {/* To Language */}
          <div className="text-center">
            <div className="text-lg">{direction.to.flag}</div>
            <div className="text-xs font-medium text-heading-light">
              {direction.to.lang}
            </div>
          </div>
        </div>
      </div>

      {/* Random Text Button */}
      {onRandomText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            type="primary"
            icon={<ReloadOutlined spin={isGeneratingRandom} />}
            onClick={onRandomText}
            loading={isGeneratingRandom}
            className="bg-pink-500 hover:bg-pink-600 border-pink-500 hover:border-pink-600 transition-all duration-300 hover:scale-105"
            style={{
              background: '#ec4899',
              borderColor: '#ec4899',
            }}
          >
            Ngẫu nhiên
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TranslationTypeSelector
