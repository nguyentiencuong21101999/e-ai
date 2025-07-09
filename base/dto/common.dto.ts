export interface IResponseDataDto {
  data: boolean | any
  error: string | null
  pagination: any | null
}

export interface IApiErrorResponseDto {
  error: string
  code?: number
  details?: any
  pagination: null
}

export interface IApiSuccessResponseDto<T = any> {
  data: T
  error: null
  pagination?: any
}

export interface IPaginationDto {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface IPaginatedResponseDto<T = any> {
  data: T[]
  error: string | null
  pagination: IPaginationDto
}

export interface IFormFieldErrorDto {
  field: string
  message: string
  code?: string
}

export interface IFormValidationResponseDto {
  isValid: boolean
  errors: IFormFieldErrorDto[]
  message?: string
}

export interface IFileUploadDto {
  name: string
  size: number
  type: string
  url?: string
  progress?: number
}

export interface IIdResponseDto {
  id: string | number
  message?: string
} 