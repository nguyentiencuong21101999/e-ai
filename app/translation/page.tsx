"use client"

import ConversationSection from "@/components/Screens/TranslationPage/ConversationSection"
import TranslationInput from "@/components/Screens/TranslationPage/TranslationInput"
import { motion } from "framer-motion"
import { useState } from "react"

const TranslationPracticePage = () => {
  const [currentSentence, setCurrentSentence] = useState(1)

  const handleTranslationSubmit = (translation: string) => {
    // TODO: Handle translation submission and feedback
    console.log("Translation submitted:", translation)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-2">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section 1: Conversation and Feedback */}
          <div className="grid gap-6">
            <ConversationSection />
          </div>

          {/* Section 2: Translation Input */}
          <TranslationInput onSubmit={handleTranslationSubmit} />
        </motion.div>
      </div>
    </div>
  )
}

export default TranslationPracticePage
