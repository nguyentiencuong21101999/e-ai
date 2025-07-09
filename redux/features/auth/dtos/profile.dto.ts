export interface IUserStatsDto {
  value?: number
  statsType?: number
}

export interface IUserProfileDto {
  username?: string
  email?: string
  phoneNumber?: string
  fullName?: string
  dob?: Date
  affiliate?: string
  refAffiliate?: string
  refUserIdAffiliate?: number
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  status?: number
  roleId?: number
  discount?: number
  statsUser?: IUserStatsDto[]
  balance?: number
  exchangeRate?: number
  payment?: any
}

export interface IUserProfileWithTokenDto extends IUserProfileDto {
  accessToken?: string
}

export interface IUpdateProfileRequestDto {
  fullName?: string
  phoneNumber?: string
  dob?: string
  email?: string
}

export interface IUpdateProfileResponseDto {
  success: boolean
  profile?: IUserProfileDto
  message?: string
}

export interface IProfileApiResponseDto {
  data: IUserProfileDto | IUpdateProfileResponseDto
  error: string | null
  pagination: any | null
} 