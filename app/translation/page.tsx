"use client"

import ConversationSection from "@/components/Screens/TranslationPage/ConversationSection"
import TopicSelector from "@/components/Screens/TranslationPage/TopicSelector"
import TranslationTypeSelector from "@/components/Screens/TranslationPage/TranslationTypeSelector"
import {
  DialogueItem,
  Topic,
  TranslationDirection,
  translationData,
} from "@/mockup/translationData"
import { motion } from "framer-motion"
import { useState } from "react"
import { MdArrowBack } from "react-icons/md"

const TranslationPracticePage = () => {
  const [selectedDirection, setSelectedDirection] =
    useState<TranslationDirection | null>(TranslationDirection.VI_TO_EN)
  const [selectedDialogue, setSelectedDialogue] = useState<DialogueItem | null>(
    null
  )
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const handleDirectionChange = (direction: TranslationDirection) => {
    setSelectedDirection(direction)
    setSelectedDialogue(null)
    setSelectedTopic(null)
  }

  const handleDialogueSelect = (dialogue: DialogueItem, topic: Topic) => {
    setSelectedDialogue(dialogue)
    setSelectedTopic(topic)
  }

  const handleBackToTopics = () => {
    setSelectedDialogue(null)
    setSelectedTopic(null)
  }

  const currentTopics = selectedDirection
    ? translationData[selectedDirection] || []
    : []

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="w-full px-4 py-8">
        {/* Hiển thị ConversationSection khi đã chọn dialogue */}
        {selectedDialogue && selectedTopic ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Header với nút back */}
            <button
              onClick={handleBackToTopics}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-heading-light rounded-lg transition-colors mb-8"
            >
              <MdArrowBack className="w-5 h-5" />
              <span>Quay lại chọn câu</span>
            </button>

            <ConversationSection selectedText={selectedDialogue.original} />
          </motion.div>
        ) : (
          /* Hiển thị selection steps khi chưa chọn dialogue */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Bước 1: Chọn hướng dịch */}
            {/* Bước 2: Chọn chủ đề (chỉ hiện khi đã chọn hướng dịch) */}
            {selectedDirection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* TranslationTypeSelector ở góc phải trên */}
                <div className="absolute top-2 right-3 z-10">
                  <TranslationTypeSelector
                    selectedDirection={selectedDirection}
                    onDirectionChange={handleDirectionChange}
                  />
                </div>

                <TopicSelector
                  topics={currentTopics}
                  direction={selectedDirection}
                  onDialogueSelect={handleDialogueSelect}
                />
              </motion.div>
            )}

            {/* Hướng dẫn khi chưa chọn hướng dịch */}
            {!selectedDirection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center relative"
              >
                {/* TranslationTypeSelector ở góc phải trên */}
                <div className="absolute top-4 right-4">
                  <TranslationTypeSelector
                    selectedDirection={selectedDirection}
                    onDirectionChange={handleDirectionChange}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TranslationPracticePage
