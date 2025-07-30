"use client"

import { useScrollToTop } from "@/hooks/useScrollToTop"
import { getListIrregularVerbs } from "@/redux/features/irregular-verb/action"
import { IIrregularVerbDto } from "@/redux/features/irregular-verb/dtos/irregular-verb.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const IrregularVerbsPracticePage = () => {
  useScrollToTop()
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const { irregularVerbs, irregularVerbsLoading } = useAppSelector((state) => state.irregularVerbReducer)
  
  const [currentVerb, setCurrentVerb] = useState<IIrregularVerbDto | null>(null)
  const [practicedVerbs, setPracticedVerbs] = useState<Set<string>>(new Set())
  const [v2Input, setV2Input] = useState("")
  const [v3Input, setV3Input] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [showLevelDropdown, setShowLevelDropdown] = useState(false)

  // Filter verbs based on selected level
  const filteredVerbs = selectedLevel === "all" 
    ? irregularVerbs 
    : irregularVerbs.filter(verb => verb.level.toLowerCase() === selectedLevel.toLowerCase())

  // Fetch all irregular verbs
  useEffect(() => {
    dispatch(getListIrregularVerbs({
      page: 1,
      limit: 9999,
      order: 'v1',
      by: 'asc'
    }))
  }, [dispatch])

  // Select random verb when data is loaded
  useEffect(() => {
    if (filteredVerbs.length > 0 && !currentVerb) {
      selectRandomVerb()
    }
  }, [filteredVerbs])

  // Handle moving to next word when all verbs are practiced
  useEffect(() => {
    if (filteredVerbs.length > 0 && practicedVerbs.size === filteredVerbs.length) {
      // All verbs have been practiced, reset and select new word
      setPracticedVerbs(new Set())
      setTimeout(() => {
        selectRandomVerb()
      }, 500)
    }
  }, [practicedVerbs.size, filteredVerbs.length])

  const selectRandomVerb = () => {
    const availableVerbs = filteredVerbs.filter((verb: IIrregularVerbDto) => !practicedVerbs.has(verb.irregularVerbId))
    
    if (availableVerbs.length === 0) {
      // All verbs have been practiced, don't reset here
      return
    }
    
    const randomIndex = Math.floor(Math.random() * availableVerbs.length)
    const selectedVerb = availableVerbs[randomIndex]
    setCurrentVerb(selectedVerb)
    setV2Input("")
    setV3Input("")
    setIsCorrect(null)
    setErrorMessage("")
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level)
    setShowLevelDropdown(false)
    setPracticedVerbs(new Set())
    setCurrentVerb(null)
    setV2Input("")
    setV3Input("")
    setIsCorrect(null)
    setErrorMessage("")
  }

  const getLevelDisplayName = (level: string) => {
    switch (level) {
      case "all":
        return "Tất cả cấp độ"
      case "basic":
        return "Cơ bản"
      case "intermediate":
        return "Trung cấp"
      case "advanced":
        return "Nâng cao"
      default:
        return "Tất cả cấp độ"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "basic":
        return "text-green-600"
      case "intermediate":
        return "text-blue-600"
      case "advanced":
        return "text-purple-600"
      default:
        return "text-pink-600"
    }
  }

  const handleSubmit = () => {
    if (!currentVerb) return

    const isV2Correct = v2Input.trim().toLowerCase() === currentVerb.v2.toLowerCase()
    const isV3Correct = v3Input.trim().toLowerCase() === currentVerb.v3.toLowerCase()

    if (isV2Correct && isV3Correct) {
      setIsCorrect(true)
      setErrorMessage("")
      // Add to practiced verbs
      setPracticedVerbs(prev => new Set(Array.from(prev).concat(currentVerb.irregularVerbId)))
      
      // Move to next word after a short delay
      setTimeout(() => {
        selectRandomVerb()
      }, 1500)
    } else {
      setIsCorrect(false)
      setErrorMessage("Sai rồi! Hãy thử lại.")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleBackClick = () => {
    router.push("/irregular-verbs")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.level-dropdown')) {
        setShowLevelDropdown(false)
      }
    }

    if (showLevelDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLevelDropdown])

  if (irregularVerbsLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-pink-600 text-lg">Đang tải dữ liệu...</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          {/* Header with back button and level filter */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-pink-600 hover:text-white hover:bg-pink-500 transition-all duration-300 rounded-lg px-3 py-2 font-medium"
            >
              <ArrowLeftOutlined />
              Quay lại
            </button>

            {/* Level Filter Dropdown */}
            <div className="relative level-dropdown">
              <button
                onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                <span>{getLevelDisplayName(selectedLevel)}</span>
                <DownOutlined className={`transition-transform duration-200 ${showLevelDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLevelDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-pink-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="py-1">
                    <button
                      onClick={() => handleLevelChange("all")}
                      className={`w-full text-left px-4 py-2 hover:bg-pink-50 transition-colors ${
                        selectedLevel === "all" ? "bg-pink-100 text-pink-700" : "text-gray-700"
                      }`}
                    >
                      Tất cả cấp độ
                    </button>
                    <button
                      onClick={() => handleLevelChange("basic")}
                      className={`w-full text-left px-4 py-2 hover:bg-pink-50 transition-colors ${
                        selectedLevel === "basic" ? "bg-pink-100 text-green-600" : "text-gray-700"
                      }`}
                    >
                      <span className="text-green-600">Cơ bản</span>
                    </button>
                    <button
                      onClick={() => handleLevelChange("intermediate")}
                      className={`w-full text-left px-4 py-2 hover:bg-pink-50 transition-colors ${
                        selectedLevel === "intermediate" ? "bg-pink-100 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <span className="text-blue-600">Trung cấp</span>
                    </button>
                    <button
                      onClick={() => handleLevelChange("advanced")}
                      className={`w-full text-left px-4 py-2 hover:bg-pink-50 transition-colors ${
                        selectedLevel === "advanced" ? "bg-pink-100 text-purple-600" : "text-gray-700"
                      }`}
                    >
                      <span className="text-purple-600">Nâng cao</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
            <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
              Luyện động từ bất quy tắc
            </h1>

            {/* Progress indicator */}
            <div className="mb-6 text-center">
              <div className="text-pink-600 font-medium">
                Đã luyện: {practicedVerbs.size} / {filteredVerbs.length} từ
              </div>
              <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(practicedVerbs.size / filteredVerbs.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {currentVerb && (
              <div className="space-y-6">
                {/* Current verb display */}
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-pink-800">
                    {currentVerb.v1}
                  </div>
                  <div className="text-lg text-pink-600">
                    <strong>Nghĩa:</strong> {currentVerb.meaning}
                  </div>
                  <div className="text-sm text-pink-500 bg-pink-50 p-4 rounded-lg">
                    <strong>Ví dụ:</strong> {currentVerb.example}
                  </div>
                </div>

                {/* Input fields */}
                <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      V2 (Quá khứ đơn):
                    </label>
                    <input
                      type="text"
                      value={v2Input}
                      onChange={(e) => setV2Input(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full flex-1 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      V3 (Quá khứ phân từ):
                    </label>
                    <input
                      type="text"
                      value={v3Input}
                      onChange={(e) => setV3Input(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full flex-1 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!v2Input.trim() || !v3Input.trim() || isCorrect === true}
                    className="bg-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Kiểm tra
                  </button>
                </div>

                {/* Result message */}
                {isCorrect !== null && (
                  <div className={`text-center p-4 rounded-lg ${
                    isCorrect 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckOutlined className="text-green-600" />
                          <span>Chính xác! Chuyển sang từ tiếp theo...</span>
                        </>
                      ) : (
                        <>
                          <CloseOutlined className="text-red-600" />
                          <span>{errorMessage}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!currentVerb && filteredVerbs.length > 0 && (
              <div className="text-center text-pink-500">
                Đang chọn từ ngẫu nhiên...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IrregularVerbsPracticePage

