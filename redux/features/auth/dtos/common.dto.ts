export interface IFormEmailDto {
  emailOrUsername: string
  dob: string
}

export interface IAuthSessionDto {
  sessionId: string
  expiresAt: string
  createdAt: string
  device?: string
  ipAddress?: string
}

export interface IPasswordStrengthDto {
  score: number
  isValid: boolean
  feedback: string[]
  criteria: {
    minLength: boolean
    hasUppercase: boolean
    hasLowercase: boolean
    hasNumbers: boolean
    hasSpecialChars: boolean
  }
}

export interface IAuthRateLimitDto {
  attemptsRemaining: number
  lockoutTime?: number
  resetTime: string
} 