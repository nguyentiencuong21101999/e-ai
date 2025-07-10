"use client"

import { TranslationDirection } from "@/mockup/translationData"
import { ConfigProvider, Radio } from "antd"
import { motion } from "framer-motion"

interface TranslationTypeSelectorProps {
  selectedDirection: TranslationDirection | null
  onDirectionChange: (direction: TranslationDirection) => void
}

const TranslationTypeSelector: React.FC<TranslationTypeSelectorProps> = ({
  selectedDirection,
  onDirectionChange,
}) => {
  const radioOptions = [
    {
      label: (
        <span className="text-heading-light font-medium text-sm">
          🇺🇸 EN → VI 🇻🇳
        </span>
      ),
      value: TranslationDirection.EN_TO_VI,
    },
    {
      label: (
        <span className="text-heading-light font-medium text-sm">
          🇻🇳 VI → EN 🇺🇸
        </span>
      ),
      value: TranslationDirection.VI_TO_EN,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-2"
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ec4899', // pink-500
          },
        }}
      >
        <Radio.Group
          options={radioOptions}
          onChange={(e) => onDirectionChange(e.target.value)}
          value={selectedDirection}
          className="flex flex-col space-y-2"
        />
      </ConfigProvider>
    </motion.div>
  )
}

export default TranslationTypeSelector
