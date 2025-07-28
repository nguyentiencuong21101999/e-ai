export interface IIrregularVerbDto {
  createdBy: string | null
  createdDate: string
  updatedBy: string | null
  updatedDate: string
  irregularVerbId: string
  v1: string
  v2: string
  v3: string
  meaning: string
  example: string
  level: string
  sortOrder: number
}

export interface IIrregularVerbListResponseDto {
  data: IIrregularVerbDto[]
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
  }
}

export interface IGetIrregularVerbsRequestDto {
  page?: number
  limit?: number
  order?: 'v1' | 'v2' | 'v3' | 'level' | 'sortOrder'
  by?: 'asc' | 'desc'
  search?: string
} 