import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from './reducer/cryptoSlice'

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch