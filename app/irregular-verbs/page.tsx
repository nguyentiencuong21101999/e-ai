"use client"

import { useScrollToTop } from "@/hooks/useScrollToTop"
import { getListIrregularVerbs } from "@/redux/features/irregular-verb"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createPaginationStyles } from "@/utils/helpers"
import { SearchOutlined } from "@ant-design/icons"
import { Input, Pagination, Spin, Table } from "antd"
import { useEffect, useState } from "react"

const { Search } = Input

// Custom styles for pagination components - Using global custom-pagination class
const paginationStyles = createPaginationStyles("topics-pagination")

const IrregularVerbsPage = () => {
  useScrollToTop()

  const dispatch = useAppDispatch()
  const {
    irregularVerbs,
    irregularVerbsLoading,
    irregularVerbsError,
    irregularVerbsPagination,
  } = useAppSelector((state) => state.irregularVerbReducer)

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [orderBy, setOrderBy] = useState<
    "v1" | "v2" | "v3" | "level" | "sortOrder"
  >("v1")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Load data when component mounts or parameters change
  useEffect(() => {
    dispatch(
      getListIrregularVerbs({
        page: currentPage,
        limit: pageSize,
        order: orderBy,
        by: sortOrder,
        search: debouncedSearchTerm || undefined,
      })
    )
  }, [dispatch, currentPage, pageSize, orderBy, sortOrder, debouncedSearchTerm])

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  // Handle pagination change
  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page)
    if (size && size !== pageSize) {
      setPageSize(size)
      setCurrentPage(1)
    }
  }

  // Handle table sorting
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.field) {
      setOrderBy(sorter.field)
      setSortOrder(sorter.order === "descend" ? "desc" : "asc")
    }
  }

  // Table columns configuration
  const columns = [
    {
      title: "V1 (Infinitive)",
      dataIndex: "v1",
      key: "v1",
      sorter: true,
      render: (text: string) => (
        <span className="font-semibold text-blue-600">{text}</span>
      ),
    },
    {
      title: "V2 (Past Simple)",
      dataIndex: "v2",
      key: "v2",
      sorter: true,
      render: (text: string) => (
        <span className="font-semibold text-green-600">{text}</span>
      ),
    },
    {
      title: "V3 (Past Participle)",
      dataIndex: "v3",
      key: "v3",
      sorter: true,
      render: (text: string) => (
        <span className="font-semibold text-purple-600">{text}</span>
      ),
    },
    {
      title: "Nghĩa",
      dataIndex: "meaning",
      key: "meaning",
      render: (text: string) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Ví dụ",
      dataIndex: "example",
      key: "example",
      render: (text: string) => (
        <div className="max-w-xs">
          <span className="text-sm text-gray-600 italic">{text}</span>
        </div>
      ),
    },
    {
      title: "Cấp độ",
      dataIndex: "level",
      key: "level",
      sorter: true,
      render: (level: string) => {
        const getLevelColor = (level: string) => {
          switch (level.toLowerCase()) {
            case "basic":
              return "bg-green-100 text-green-800"
            case "intermediate":
              return "bg-yellow-100 text-yellow-800"
            case "advanced":
              return "bg-red-100 text-red-800"
            default:
              return "bg-gray-100 text-gray-800"
          }
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
              level
            )}`}
          >
            {level}
          </span>
        )
      },
    },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          <h1 className="mb-8 text-center text-4xl font-bold text-heading-light">
            Động từ bất quy tắc
          </h1>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Học và ghi nhớ các động từ bất quy tắc trong tiếng Anh
            </p>
          </div>

          {/* Search Input & Pagination - Same row */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Input - Left */}
            <div className="relative">
              <Input
                placeholder="Tìm kiếm động từ..."
                allowClear
                prefix={<SearchOutlined className="text-pink-400" />}
                size="large"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-80 h-11 search-input-pink"
              />
            </div>

            {/* Pagination - Right */}
            {irregularVerbsPagination &&
              irregularVerbsPagination.total > 0 &&
              !irregularVerbsLoading && (
                <div className="flex justify-center sm:justify-end">
                  <Pagination
                    current={irregularVerbsPagination.page}
                    pageSize={irregularVerbsPagination.limit}
                    total={irregularVerbsPagination.total}
                    onChange={handlePaginationChange}
                    className="custom-pagination topics-pagination"
                    size="small"
                    showLessItems
                  />
                </div>
              )}
          </div>

          {/* Custom pagination styles */}
          <style jsx global>
            {paginationStyles}
          </style>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            {irregularVerbsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spin size="large" />
              </div>
            ) : irregularVerbsError ? (
              <div className="text-center py-12 text-red-600">
                {irregularVerbsError}
              </div>
            ) : (
              <>
                <Table
                  columns={columns}
                  dataSource={irregularVerbs}
                  rowKey="irregularVerbId"
                  pagination={false}
                  onChange={handleTableChange}
                  className="irregular-verbs-table"
                  scroll={{ x: 800 }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IrregularVerbsPage
