"use client"

import { DialogueItem, Topic, TranslationDirection } from "@/mockup/translationData"
import { Badge, Card, Collapse } from "antd"
import { motion } from "framer-motion"
import { MdChat, MdMenuBook } from "react-icons/md"
import TranslationTypeSelector from "./TranslationTypeSelector"

interface TopicSelectorProps {
  topics: Topic[]
  direction: TranslationDirection
  onDialogueSelect: (dialogue: DialogueItem, topic: Topic) => void
  onTopicSelect?: (topic: Topic) => void
  onDirectionChange: (direction: TranslationDirection) => void
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  direction,
  onDialogueSelect,
  onTopicSelect,
  onDirectionChange
}) => {
  const getDifficultyColor = (difficulty: DialogueItem['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return '#f472b6' // pink-400
      case 'medium':
        return '#fb7185' // rose-400
      case 'hard':
        return '#e11d48' // rose-600
      default:
        return '#ec4899' // pink-500
    }
  }

  const getDifficultyText = (difficulty: DialogueItem['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'Dễ'
      case 'medium':
        return 'Trung bình'
      case 'hard':
        return 'Khó'
      default:
        return 'Không xác định'
    }
  }

  const collapseItems = topics.map((topic) => ({
    key: topic.id,
    label: (
      <div className="flex items-center justify-between w-full py-3">
        <div className="flex items-center space-x-3">
          <MdMenuBook className="w-6 h-6 text-pink-500" />
          <div>
            <h3 className="font-semibold text-heading-light text-lg">{topic.title}</h3>
            <p className="text-sm text-gray-500">{topic.description}</p>
          </div>
        </div>
        <Badge count={topic.dialogues.length} style={{ backgroundColor: '#ec4899' }} />
      </div>
    ),
    children: (
      <div className="space-y-3 px-4 pb-2">
        {topic.dialogues.map((dialogue, index) => (
          <motion.div
            key={dialogue.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              size="small"
              hoverable
              onClick={() => onDialogueSelect(dialogue, topic)}
              className="cursor-pointer hover:shadow-lg hover:border-pink-300 transition-all duration-200 border-l-4 border-l-pink-400 hover:bg-pink-50"
              style={{ borderRadius: '8px' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <MdChat className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-medium text-heading-light">
                      Câu {index + 1}
                    </span>
                    <Badge
                      color={getDifficultyColor(dialogue.difficulty)}
                      text={getDifficultyText(dialogue.difficulty)}
                      style={{ fontSize: '12px' }}
                    />
                  </div>
                  <p className="text-heading-light leading-relaxed text-base font-medium">
                    {dialogue.original}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
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
      
      <Collapse
        items={collapseItems}
        size="large"
        className="bg-pink-50 border-0"
        expandIconPosition="end"
        style={{
          backgroundColor: '#fdf2f8',
          borderRadius: '12px'
        }}
      />
      
      {topics.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MdMenuBook className="w-12 h-12 mx-auto mb-3 text-pink-300" />
          <p className="text-heading-light">Chưa có chủ đề nào để luyện tập</p>
        </div>
      )}
    </motion.div>
  )
}

export default TopicSelector 