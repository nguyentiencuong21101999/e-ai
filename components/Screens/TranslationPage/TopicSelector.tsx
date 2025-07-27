"use client"

import { TranslationDirection } from "@/mockup/translationData"
import { getDialogues } from "@/redux/features/translation/action"
import { ITopicDto } from "@/redux/features/translation/dtos/topic.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
  Alert,
  Badge,
  Button,
  Card,
  Collapse,
  Input,
  Pagination,
  Space,
} from "antd"
import { motion } from "framer-motion"
import React, { useState } from "react"
import {
  MdArrowDownward,
  MdArrowUpward,
  MdChat,
  MdMenuBook,
  MdSearch,
  MdSort,
} from "react-icons/md"
import TranslationTypeSelector from "./TranslationTypeSelector"

interface TopicSelectorProps {
  topics: ITopicDto[]
  direction: TranslationDirection
  onDialogueSelect: (dialogueContent: string, topic: ITopicDto) => void
  onTopicSelect?: (topic: ITopicDto) => void
  onDirectionChange: (direction: TranslationDirection) => void
  onPageChange?: (page: number, pageSize?: number) => void
  onSearchChange?: (search: string) => void
  searchValue?: string
  loading?: boolean
  error?: string | null
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  direction,
  onDialogueSelect,
  onTopicSelect,
  onDirectionChange,
  onPageChange,
  onSearchChange,
  searchValue = "",
  loading = false,
  error = null,
}) => {
  const dispatch = useAppDispatch()
  const {
    dialogues,
    dialoguesLoading,
    dialoguesError,
    topicsPagination,
    dialoguesPagination,
  } = useAppSelector((state) => state.translationReducer)

  // Track expanded topic để tránh duplicate API calls (chỉ một topic có thể mở)
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  // Dialogues pagination and sorting state
  const [dialoguesPage, setDialoguesPage] = useState(1)
  const [dialoguesPageSize, setDialoguesPageSize] = useState(5)
  const [sortBy, setSortBy] = useState<"difficulty" | "sortOrder">("difficulty")
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC")

  const handleTopicClick = async (
    topic: ITopicDto,
    page: number = 1,
    pageSize: number = 5
  ) => {
    try {
      const result = await dispatch(
        getDialogues({
          topicId: topic.topicId,
          type: direction === TranslationDirection.VI_TO_EN ? "VI" : "EN",
          order: sortBy,
          by: sortOrder,
          page,
          limit: pageSize,
        })
      ).unwrap()
      console.log("Dialogues result:", result)
    } catch (error) {
      console.error("❌ Error fetching dialogues:", error)
    }
  }

  // Handle collapse expand - gọi API khi expand
  const handleCollapseChange = (activeKeys: string | string[]) => {
    const keys = Array.isArray(activeKeys) ? activeKeys : [activeKeys]
    const newActiveKey = keys.length > 0 ? keys[0] : null

    // Chỉ gọi API nếu topic mới được expand và chưa load data
    if (newActiveKey && newActiveKey !== expandedTopic) {
      const topic = topics.find((t) => t._id === newActiveKey)
      if (topic) {
        // Reset pagination when switching topics
        setDialoguesPage(1)
        // Gọi API cho topic mới expand
        handleTopicClick(topic, 1, dialoguesPageSize)
      }
    }

    // Cập nhật topic đang expanded
    setExpandedTopic(newActiveKey)
  }

  // Handle pagination change for topics
  const handlePaginationChange = (page: number, pageSize?: number) => {
    if (onPageChange) {
      onPageChange(page, pageSize)
    }
    // Reset expanded topic khi chuyển trang
    setExpandedTopic(null)
  }

  // Handle pagination change for dialogues
  const handleDialoguesPaginationChange = (page: number, pageSize?: number) => {
    const newPageSize = pageSize || dialoguesPageSize
    setDialoguesPage(page)
    setDialoguesPageSize(newPageSize)

    if (expandedTopic) {
      const topic = topics.find((t) => t._id === expandedTopic)
      if (topic) {
        handleTopicClick(topic, page, newPageSize)
      }
    }
  }

  // Handle sort change for dialogues
  const handleSortChange = (
    newSortBy: "difficulty" | "sortOrder",
    newSortOrder: "ASC" | "DESC"
  ) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)

    if (expandedTopic) {
      const topic = topics.find((t) => t._id === expandedTopic)
      if (topic) {
        // Reset to page 1 when sorting changes
        setDialoguesPage(1)
        handleTopicClick(topic, 1, dialoguesPageSize)
      }
    }
  }

  const getTopicTitle = (topic: ITopicDto) => {
    return direction === TranslationDirection.VI_TO_EN
      ? topic.titleVi
      : topic.titleEn
  }

  const collapseItems = topics.map((topic) => ({
    key: topic._id,
    label: (
      <div className="flex items-center justify-between w-full py-3 cursor-pointer hover:bg-pink-50 rounded-lg px-2 -mx-2 transition-colors">
        <div className="flex items-center space-x-3">
          <MdMenuBook className="w-6 h-6 text-pink-500" />
          <div>
            <h3 className="font-semibold text-heading-light text-lg">
              {getTopicTitle(topic)}
            </h3>
          </div>
        </div>
        <Badge
          count={topic.dialoguesCount}
          style={{ backgroundColor: "#ec4899" }}
        />
      </div>
    ),
    children: (
      <div className="space-y-4 px-4 pb-2">
        {/* Dialogues Controls Section - Above content */}
        {!dialoguesLoading && !dialoguesError && dialogues.length > 0 && (
          <div className="space-y-3 mb-4">
            {/* Sorting and Pagination Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-3 bg-pink-25 rounded-lg border border-pink-100">
              {/* Sorting Controls - Left */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <MdSort className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium text-pink-700">
                    Độ khó:
                  </span>
                </div>
                <Space.Compact>
                  <Button
                    size="small"
                    type={
                      sortBy === "difficulty" && sortOrder === "ASC"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleSortChange("difficulty", "ASC")}
                    icon={<MdArrowUpward className="w-3 h-3" />}
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor:
                        sortBy === "difficulty" && sortOrder === "ASC"
                          ? "#ec4899"
                          : undefined,
                      borderColor: "#ec4899",
                      color:
                        sortBy === "difficulty" && sortOrder === "ASC"
                          ? "white"
                          : "#ec4899",
                    }}
                  />
                  <Button
                    size="small"
                    type={
                      sortBy === "difficulty" && sortOrder === "DESC"
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleSortChange("difficulty", "DESC")}
                    icon={<MdArrowDownward className="w-3 h-3" />}
                    className="flex items-center justify-center"
                    style={{
                      backgroundColor:
                        sortBy === "difficulty" && sortOrder === "DESC"
                          ? "#ec4899"
                          : undefined,
                      borderColor: "#ec4899",
                      color:
                        sortBy === "difficulty" && sortOrder === "DESC"
                          ? "white"
                          : "#ec4899",
                    }}
                  />
                </Space.Compact>
              </div>

              {/* Pagination - Right */}
              {dialoguesPagination && dialoguesPagination.total > 0 && (
                <div className="flex justify-center sm:justify-end ml-6 sm:ml-10">
                                     <style jsx global>{`
                     .dialogues-pagination .ant-pagination-item,
                     .dialogues-pagination .ant-pagination-prev,
                     .dialogues-pagination .ant-pagination-next {
                       margin-right: 5px !important;
                       margin-left: 0 !important;
                     }
                     .dialogues-pagination .ant-pagination-item:last-child,
                     .dialogues-pagination .ant-pagination-next:last-child {
                       margin-right: 0 !important;
                     }
                     
                     /* Disable hover background color change */
                     .dialogues-pagination .ant-pagination-item:hover,
                     .dialogues-pagination .ant-pagination-prev:hover,
                     .dialogues-pagination .ant-pagination-next:hover {
                       background-color: inherit !important;
                       border-color: inherit !important;
                     }
                     
                     .dialogues-pagination .ant-pagination-item:hover a,
                     .dialogues-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
                     .dialogues-pagination .ant-pagination-next:hover .ant-pagination-item-link {
                       color: inherit !important;
                     }
                   `}</style>
                  <Pagination
                    current={dialoguesPage}
                    pageSize={dialoguesPageSize}
                    total={dialoguesPagination.total}
                    onChange={handleDialoguesPaginationChange}
                    showQuickJumper
                    showSizeChanger={false}
                    className="custom-pagination dialogues-pagination"
                    size="small"
                    showLessItems
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {dialoguesLoading ? (
          <div className="text-center py-6">
            {/* Pulsing Heart Loading */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex justify-center mb-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💬</span>
                </div>
                {/* Ripple Effect */}
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 2.5],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 border-2 border-pink-400 rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-pink-600 font-medium"
            >
              Đang tải hội thoại...
            </motion.p>
          </div>
        ) : dialoguesError ? (
          <Alert message="Lỗi" description={dialoguesError} type="error" />
        ) : dialogues.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-6"
          >
            {/* Bouncing Chat Bubbles */}
            <div className="relative h-16 mb-4 flex justify-center items-center">
              {[0, 1].map((index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${index === 0 ? "left-0" : "right-0"}`}
                >
                  <div
                    className={
                      index === 0
                        ? "w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center relative"
                        : "w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center relative"
                    }
                  >
                    <MdChat className="w-4 h-4 text-white" />
                    {/* Speech bubble tail */}
                    <div
                      className={
                        index === 0
                          ? "absolute -bottom-1 left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-400"
                          : "absolute -bottom-1 right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-300"
                      }
                    />
                  </div>
                </motion.div>
              ))}

              {/* Center connecting dots */}
              <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="w-1.5 h-1.5 bg-pink-400 rounded-full"
                  />
                ))}
              </div>
            </div>

            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-medium text-pink-600 mb-1"
            >
              Chưa có hội thoại nào
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-500"
            >
              Click để tải hội thoại cho chủ đề này
            </motion.p>
          </motion.div>
        ) : (
          /* Dialogues List */
          <div className="space-y-3">
            {dialogues.map((dialogue, index) => (
              <motion.div
                key={dialogue._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  size="small"
                  hoverable
                  onClick={() =>
                    onDialogueSelect(
                      dialogue.original || dialogue.content?.original || "",
                      topic
                    )
                  }
                  className="cursor-pointer hover:shadow-lg hover:border-pink-300 transition-all duration-200 border-l-4 border-l-pink-400 hover:bg-pink-50"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <MdChat className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-heading-light">
                          Câu{" "}
                          {(dialoguesPage - 1) * dialoguesPageSize + index + 1}
                        </span>
                        <Badge
                          color="#ec4899"
                          text={dialogue.difficulty || "Trung bình"}
                          style={{ fontSize: "12px" }}
                        />
                      </div>
                      <p className="text-heading-light leading-relaxed text-base font-medium">
                        {dialogue.original ||
                          dialogue.content?.original ||
                          "Nội dung hội thoại"}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    ),
  }))

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center py-6"
        >
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-rose-600 mb-2">
            Lỗi tải dữ liệu
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="inline-flex items-center px-4 py-2 bg-rose-50 text-rose-700 rounded-lg border border-rose-200">
            <span className="mr-2">⚠️</span>
            Vui lòng thử lại sau
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8"
    >
      {/* Header Section - Always visible */}
      <div className="mb-6">
        {/* Header with title and direction selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-2xl font-bold text-heading-light flex items-center justify-center md:justify-start">
            <span className="text-3xl mr-3">📚</span>
            Chọn chủ đề luyện tập
          </h2>

          <div className="flex justify-center md:justify-end">
            <TranslationTypeSelector
              selectedDirection={direction}
              onDirectionChange={onDirectionChange}
            />
          </div>
        </div>

        {/* Search Input - Left aligned below title */}
        <div className="flex justify-start">
          <div className="relative">
            <Input
              placeholder="Tìm kiếm chủ đề..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              prefix={<MdSearch className="text-pink-400" />}
              className="w-80 h-11 search-input-pink"
              allowClear
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Content Section - Topics List Area */}
      <div className="min-h-[400px]">
        {/* Loading State - Only for topics content */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              {/* Three Dots Loading */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center space-x-1 mb-6"
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 bg-pink-500 rounded-full"
                  />
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-pink-600 font-medium text-lg"
              >
                Đang tải chủ đề...
              </motion.p>
            </div>
          </div>
        ) : (
          <>
            {/* Topics List */}
            <Collapse
              items={collapseItems}
              size="large"
              className="bg-pink-50 border-0 mb-6"
              expandIconPosition="end"
              onChange={handleCollapseChange}
              activeKey={expandedTopic ? [expandedTopic] : []}
              accordion
              style={{
                backgroundColor: "#fdf2f8",
                borderRadius: "12px",
              }}
            />

            {/* Pagination */}
            {topicsPagination && topicsPagination.total > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex justify-center mt-6"
              >
                <Pagination
                  current={topicsPagination.page}
                  pageSize={topicsPagination.limit}
                  total={topicsPagination.total}
                  onChange={handlePaginationChange}
                  showQuickJumper
                  className="custom-pagination"
                  style={{
                    textAlign: "center",
                  }}
                />
              </motion.div>
            )}

            {/* Empty State */}
            {topics.length === 0 && !error && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-16 px-8"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="mx-2"
                    >
                      <MdMenuBook
                        className={
                          index === 0
                            ? "w-12 h-12 text-pink-400"
                            : index === 1
                            ? "w-12 h-12 text-pink-500"
                            : "w-12 h-12 text-pink-600"
                        }
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.h3
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-xl font-semibold text-pink-600 mb-2"
                >
                  Chưa có chủ đề nào
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-500 max-w-md mx-auto mb-4"
                >
                  Hiện tại chưa có chủ đề luyện tập nào. Vui lòng quay lại sau
                  hoặc thử chọn hướng dịch khác.
                </motion.p>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.9,
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                  }}
                  className="inline-flex items-center px-4 py-2 bg-pink-50 text-pink-700 rounded-lg border border-pink-200"
                >
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="mr-2"
                  >
                    💡
                  </motion.span>
                  Hãy thử lại sau nhé!
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default TopicSelector
