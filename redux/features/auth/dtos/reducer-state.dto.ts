import { ISignInResponseDto } from "./sign-in.dto"

export interface IAuthReducerStateDto {
  profile: ISignInResponseDto
  loadingSignup: boolean
  loadingSignIn: boolean
  loadingGetBanner: boolean
  loadingSignOut: boolean
  listBanner: any[]
}

export const authDefaultReducer: IAuthReducerStateDto = {
  loadingSignup: false,
  loadingSignIn: false,
  profile: {} as ISignInResponseDto,
  loadingGetBanner: false,
  loadingSignOut: false,
  listBanner: [],
} 