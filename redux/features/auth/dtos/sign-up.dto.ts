export interface ISignUpRequestDto {
  username: string
  email: string
  password: string
  fullName: string
  phoneNumber?: string
  dob?: string
}

export interface ISignUpResponseDto {
  success: boolean
  userId?: number
  message?: string
}

export interface ISignUpApiResponseDto {
  data: ISignUpResponseDto
  error: string | null
  pagination: any | null
} 