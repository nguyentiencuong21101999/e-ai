export interface ISignInRequestDto {
  username: string
  password: string
}

export interface IUserStatsDto {
  value: number | null
  statsType: number | null
}

export interface ISignInResponseDto {
  username: string
  email: string
  phoneNumber: string
  fullName: string
  dob: string
  affiliate: string
  refAffiliate: string | null
  refUserIdAffiliate: string | null
  isEmailVerified: boolean
  isPhoneVerified: boolean
  status: number
  roleId: number
  accessToken: string
  discount: number | null
  statsUser: IUserStatsDto[]
  balance: number
  exchangeRate: number
  payment: any | null
}

export interface ISignInApiResponseDto {
  data: ISignInResponseDto
  error: string | null
  pagination: any | null
} 