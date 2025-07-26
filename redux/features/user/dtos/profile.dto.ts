export interface IGetUserProfileRequestDto {
  // No payload needed for GET request
}

export interface IUpdateUserProfileRequestDto {
  fullName?: string
  email?: string
  phoneNumber?: string
  dob?: string
  affiliate?: string
}

export interface IChangePasswordRequestDto {
  currentPassword: string
  password: string
}

export interface IUserStatsDto {
  value: number | null
  statsType: number | null
}

export interface IUserProfileWithTokenDto {
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

export interface IUserProfileApiResponseDto {
  data: IUserProfileWithTokenDto
  error: string | null
  pagination: any | null
} 