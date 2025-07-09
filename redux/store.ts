import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./features/auth/reducer"

const persistConfig = {
  key: "sdp-website",
  storage,
  whitelist: ["authReducer", "raceReducer"],
}

const rootReducer = combineReducers({
  authReducer,
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
