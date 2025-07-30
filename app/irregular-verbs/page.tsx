"use client"

import Button from "@/components/Common/Button"
import { useScrollToTop } from "@/hooks/useScrollToTop"
import { getListIrregularVerbs } from "@/redux/features/irregular-verb"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { createPaginationStyles } from "@/utils/helpers"
import { SearchOutlined } from "@ant-design/icons"
import { Input, Pagination, Table } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaGraduationCap } from "react-icons/fa"

const { Search } = Input

// Custom styles for pagination components - Using global custom-pagination class
const paginationStyles = createPaginationStyles("topics-pagination")

// Custom 3-dot loading component
const PinkLoadingDots = () => (
  <div className="flex justify-center items-center py-12">
    <div className="flex space-x-1">
      <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
      <div
        className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  </div>
)

const IrregularVerbsPage = () => {
  useScrollToTop()
  const router = useRouter()

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
    "v1" | "v2" | "v3" | "level" | "sortOrder" | undefined
  >(undefined)
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
    console.log('API called with:', {
      page: currentPage,
      limit: pageSize,
      order: orderBy,
      by: sortOrder,
      search: debouncedSearchTerm || undefined,
    })
    
    dispatch(
      getListIrregularVerbs({
        page: currentPage,
        limit: pageSize,
        order: orderBy || undefined,
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

  // Handle practice button click
  const handlePracticeClick = () => {
    router.push("/irregular-verbs/practice")
  }

  // Custom column sort handler
  const handleColumnSort = (columnKey: string) => {
    console.log('Column sort clicked for:', columnKey, 'Current state:', { orderBy, sortOrder })
    
    if (orderBy !== columnKey) {
      // First click: ascending
      console.log('Setting ascending sort for:', columnKey)
      setOrderBy(columnKey as any)
      setSortOrder("asc")
    } else if (sortOrder === "asc") {
      // Second click: descending
      console.log('Setting descending sort for:', columnKey)
      setSortOrder("desc")
    } else {
      // Third click: no sort
      console.log('Resetting sort to default')
      setOrderBy(undefined)
      setSortOrder("asc")
    }
  }

  // Custom table change handler (no sorting since we use custom sort)
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // Custom sort is handled by handleColumnSort function
  }

  // Get current sort state for styling
  const getCurrentSortState = () => {
    return {
      field: orderBy,
      order: sortOrder === "desc" ? "descend" : "ascend"
    }
  }

  // Custom sort icon component (display only, no click handler)
  const CustomSortIcon = ({ columnKey }: { columnKey: string }) => {
    const isActive = orderBy === columnKey
    const isAscending = isActive && sortOrder === "asc"
    const isDescending = isActive && sortOrder === "desc"
    
    return (
      <div className="flex flex-col items-center justify-center ml-2 -space-y-1">
        {/* Up arrow */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-colors duration-200 ${
            isAscending ? "text-pink-600" : "text-gray-400"
          }`}
        >
          <path
            d="M6 2L10 6H2L6 2Z"
            fill="currentColor"
          />
        </svg>
        {/* Down arrow */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-colors duration-200 ${
            isDescending ? "text-pink-600" : "text-gray-400"
          }`}
        >
          <path
            d="M2 6L6 10L10 6H2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    )
  }

  // Table columns configuration
  const columns = [
    {
      title: (
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-pink-50 px-2 py-1 rounded"
          onClick={() => handleColumnSort("v1")}
        >
          <span>V1 (Infinitive)</span>
          <CustomSortIcon columnKey="v1" />
        </div>
      ),
      dataIndex: "v1",
      key: "v1",
      sorter: false,
      render: (text: string) => (
        <span className="font-semibold text-pink-600">{text}</span>
      ),
    },
    {
      title: (
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-pink-50 px-2 py-1 rounded"
          onClick={() => handleColumnSort("v2")}
        >
          <span>V2 (Past Simple)</span>
          <CustomSortIcon columnKey="v2" />
        </div>
      ),
      dataIndex: "v2",
      key: "v2",
      sorter: false,
      render: (text: string) => (
        <span className="font-semibold text-pink-500">{text}</span>
      ),
    },
    {
      title: (
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-pink-50 px-2 py-1 rounded"
          onClick={() => handleColumnSort("v3")}
        >
          <span>V3 (Past Participle)</span>
          <CustomSortIcon columnKey="v3" />
        </div>
      ),
      dataIndex: "v3",
      key: "v3",
      sorter: false,
      render: (text: string) => (
        <span className="font-semibold text-pink-400">{text}</span>
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
          <span className="text-sm text-gray-900 italic">{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-pink-50 px-2 py-1 rounded"
          onClick={() => handleColumnSort("level")}
        >
          <span>Cấp độ</span>
          <CustomSortIcon columnKey="level" />
        </div>
      ),
      dataIndex: "level",
      key: "level",
      sorter: false,
      render: (level: string) => {
        const getLevelColor = (level: string) => {
          switch (level.toLowerCase()) {
            case "basic":
              return "text-green-600"
            case "intermediate":
              return "text-blue-600"
            case "advanced":
              return "text-purple-600"
            default:
              return "text-gray-600"
          }
        }

        return (
          <span
            className={`text-xs font-semibold ${getLevelColor(
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
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          <h1 className="mb-2 text-center text-3xl font-bold text-pink-700">
            Động từ bất quy tắc
          </h1>
          
          {/* Practice Button - Centered above search */}
          <div className="mb-6 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handlePracticeClick}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaGraduationCap className="mr-2" />
              Luyện động từ bất quy tắc
            </Button>
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
                    showSizeChanger={false}
                  />
                </div>
              )}
          </div>

          {/* Custom pagination styles */}
          <style jsx global>
            {paginationStyles}
          </style>

          {/* Hide default Ant Design sort icons and show custom ones */}
          <style jsx global>{`
            /* Hide default Ant Design sort icons */
            .custom-sort-table .ant-table-thead > tr > th .ant-table-column-sorter {
              display: none !important;
            }
            
            /* Remove black background */
            .custom-sort-table .ant-table-thead > tr > th.ant-table-column-sort {
              background-color: transparent !important;
            }
            
            /* Hover effect for sorted columns */
            .custom-sort-table .ant-table-thead > tr > th.ant-table-column-sort:hover {
              background-color: rgba(236, 72, 153, 0.05) !important;
            }
            
            /* Ensure header text color remains consistent */
            .custom-sort-table .ant-table-thead > tr > th.ant-table-column-sort {
              color: #374151 !important;
            }
            
            .custom-sort-table .ant-table-thead > tr > th.ant-table-column-sort:hover {
              color: #374151 !important;
            }
            
            /* Additional override for any remaining black backgrounds */
            .custom-sort-table .ant-table-thead > tr > th {
              background-color: transparent !important;
            }
            
            .custom-sort-table .ant-table-thead > tr > th:hover {
              background-color: rgba(236, 72, 153, 0.05) !important;
            }
          `}</style>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6">
            {irregularVerbsLoading ? (
              <PinkLoadingDots />
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
                  className="irregular-verbs-table custom-sort-table"
                  scroll={{ x: 800 }}
                  showSorterTooltip={false}
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
