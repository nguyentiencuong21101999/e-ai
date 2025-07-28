"use client"

import ConversationSection from "@/components/Screens/TranslationPage/ConversationSection"
import TopicSelector from "@/components/Screens/TranslationPage/TopicSelector"
import TranslationTypeSelector from "@/components/Screens/TranslationPage/TranslationTypeSelector"
import { useScrollToTop } from "@/hooks/useScrollToTop"
import { TranslationDirection } from "@/mockup/translationData"
import { getTopic } from "@/redux/features/translation/action"
import { ITopicDto } from "@/redux/features/translation/dtos/topic.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { MdArrowBack } from "react-icons/md"

const TranslationPracticePage = () => {
  useScrollToTop()
  
  const dispatch = useAppDispatch()
  const { topics, topicsLoading, topicsError, topicsPagination } = useAppSelector(
    (state) => state.translationReducer
  )

  const [selectedDirection, setSelectedDirection] =
    useState<TranslationDirection | null>(TranslationDirection.VI_TO_EN)
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<ITopicDto | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Load topics when direction changes or pagination changes
  useEffect(() => {
    if (selectedDirection) {
      dispatch(getTopic({
        page: currentPage,
        limit: pageSize,
        search: debouncedSearchTerm || undefined,
      }))
    }
  }, [selectedDirection, currentPage, pageSize, debouncedSearchTerm, dispatch])

  // Reset to first page when search changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setCurrentPage(1)
    }
  }, [debouncedSearchTerm, searchTerm])

  const handleDirectionChange = (direction: TranslationDirection) => {
    setSelectedDirection(direction)
    setSelectedDialogue(null)
    setSelectedTopic(null)
    // Reset về trang đầu khi thay đổi hướng dịch
    setCurrentPage(1)
    // Reset search khi thay đổi hướng dịch
    setSearchTerm("")
    setDebouncedSearchTerm("")
  }

  const handleDialogueSelect = (dialogueContent: string, topic: ITopicDto) => {
    setSelectedDialogue(dialogueContent)
    setSelectedTopic(topic)
  }

  const handleBackToTopics = () => {
    setSelectedDialogue(null)
    setSelectedTopic(null)
  }

  // Handle pagination change
  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page)
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize)
      // Khi thay đổi pageSize, reset về trang đầu
      setCurrentPage(1)
    }
  }

  // Handle search change
  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search)
  }, [])

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

            <ConversationSection
              selectedText={selectedDialogue}
              translationType={selectedDirection || undefined}
            />
          </motion.div>
        ) : (
          /* Hiển thị selection steps khi chưa chọn dialogue */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Bước 2: Chọn chủ đề (chỉ hiện khi đã chọn hướng dịch) */}
            {selectedDirection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <TopicSelector
                  topics={topics}
                  direction={selectedDirection}
                  onDialogueSelect={handleDialogueSelect}
                  onDirectionChange={handleDirectionChange}
                  onPageChange={handlePageChange}
                  onSearchChange={handleSearchChange}
                  searchValue={searchTerm}
                  loading={topicsLoading}
                  error={topicsError}
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
                
                <div className="text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <h2 className="text-2xl font-bold text-heading-light mb-4">
                    Chọn hướng dịch để bắt đầu
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Vui lòng chọn hướng dịch từ góc phải trên để xem danh sách chủ đề luyện tập.
                  </p>
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
