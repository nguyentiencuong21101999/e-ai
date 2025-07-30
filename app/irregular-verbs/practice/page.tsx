"use client"

import { useScrollToTop } from "@/hooks/useScrollToTop"
import { getListIrregularVerbs } from "@/redux/features/irregular-verb/action"
import { IIrregularVerbDto } from "@/redux/features/irregular-verb/dtos/irregular-verb.dto"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
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
    if (irregularVerbs.length > 0 && !currentVerb) {
      selectRandomVerb()
    }
  }, [irregularVerbs])

  // Handle moving to next word when all verbs are practiced
  useEffect(() => {
    if (irregularVerbs.length > 0 && practicedVerbs.size === irregularVerbs.length) {
      // All verbs have been practiced, reset and select new word
      setPracticedVerbs(new Set())
      setTimeout(() => {
        selectRandomVerb()
      }, 500)
    }
  }, [practicedVerbs.size, irregularVerbs.length])

  const selectRandomVerb = () => {
    const availableVerbs = irregularVerbs.filter((verb: IIrregularVerbDto) => !practicedVerbs.has(verb.irregularVerbId))
    
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
          {/* Header with back button */}
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-pink-600 hover:text-white hover:bg-pink-500 transition-all duration-300 rounded-lg px-3 py-2 font-medium"
            >
              <ArrowLeftOutlined />
              Quay lại
            </button>
          </div>

          {/* Main content */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
            <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
              Luyện động từ bất quy tắc
            </h1>

            {/* Progress indicator */}
            <div className="mb-6 text-center">
              <div className="text-pink-600 font-medium">
                Đã luyện: {practicedVerbs.size} / {irregularVerbs.length} từ
              </div>
              <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(practicedVerbs.size / irregularVerbs.length) * 100}%` }}
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
                    disabled={!v2Input.trim() || !v3Input.trim()}
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

            {!currentVerb && irregularVerbs.length > 0 && (
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

