import { configureStore } from '@reduxjs/toolkit'
import UserAuthorReducer from './Slices/UserAuthorSlice'

export const Store = configureStore({
    reducer: {
        UserAuthorLoginReducer: UserAuthorReducer,
    }
})