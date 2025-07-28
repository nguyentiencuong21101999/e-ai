import {
    Action,
    ThunkAction,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./features/auth/reducer"
import irregularVerbReducer from "./features/irregular-verb/reducer"
import translationReducer from "./features/translation/reducer"
import userReducer from "./features/user/reducer"

const persistConfig = {
  key: "e-ai-website",
  storage,
  whitelist: ["authReducer", "raceReducer", "userReducer", "translationReducer", "irregularVerbReducer"],
  transforms: [
    {
      in: (state: any) => {
        // Reset loading states when persisting
        const newState = { ...state }
        
        if (state.authReducer) {
          newState.authReducer = {
            ...state.authReducer,
            loadingSignIn: false,
            loadingSignup: false,
            loadingSignOut: false,
            loadingGetBanner: false,
          }
        }

        if (state.userReducer) {
          newState.userReducer = {
            ...state.userReducer,
            loadingGetProfile: false,
            loadingUpdateProfile: false,
          }
        }

        if (state.translationReducer) {
          newState.translationReducer = {
            ...state.translationReducer,
            topicsLoading: false,
            dialoguesLoading: false,
          }
        }

        if (state.irregularVerbReducer) {
          newState.irregularVerbReducer = {
            ...state.irregularVerbReducer,
            irregularVerbsLoading: false,
          }
        }
        
        return newState
      },
      out: (state: any) => state,
    },
  ],
}

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  translationReducer,
  irregularVerbReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export let store = createStore()

export const persistor = persistStore(store)

export const refreshStore = () => {
  store = createStore()
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type StoreType = typeof store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
