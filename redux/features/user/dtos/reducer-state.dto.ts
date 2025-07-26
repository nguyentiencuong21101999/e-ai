import { IUserProfileWithTokenDto } from "./profile.dto"

export interface IUserReducerStateDto {
  profile: IUserProfileWithTokenDto | null
  loadingGetProfile: boolean
  loadingUpdateProfile: boolean
  loadingChangePassword: boolean
}

export const userDefaultReducer: IUserReducerStateDto = {
  profile: null,
  loadingGetProfile: false,
  loadingUpdateProfile: false,
  loadingChangePassword: false,
} 