export interface IVerifiedInfoDto {
  email: string
  phoneNumber: string
  userId: number
}

export interface ISetPasswordRequestDto {
  userId: number
  password: string
  otp: string
}

export interface IEmailVerifyRequestDto {
  email: string
  userId: number
}

export interface IPhoneVerifyRequestDto {
  phoneNumber: string
  userId: number
}

export interface IOtpVerifyRequestDto {
  otp: string
  userId: number
  type: 'email' | 'phone'
}

export interface IVerificationResponseDto {
  success: boolean
  message?: string
  accessToken?: string
}

export interface IVerificationApiResponseDto {
  data: IVerificationResponseDto | boolean
  error: string | null
  pagination: any | null
} 