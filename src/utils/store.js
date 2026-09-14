import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import geminiReducer from "./geminiSlice";
import watchlistReducer from "./watchlistSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gemini: geminiReducer,
        watchlist: watchlistReducer,
    },
});

export default store;
