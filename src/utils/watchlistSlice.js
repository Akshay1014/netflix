import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        movies: [],
        loading: false,
    },
    reducers: {
        setWatchlist: (state, action) => {
            state.movies = action.payload;
        },
        addToWatchlistLocal: (state, action) => {
            const exists = state.movies.find((m) => m.id === action.payload.id);
            if (!exists) {
                state.movies.push(action.payload);
            }
        },
        removeFromWatchlistLocal: (state, action) => {
            state.movies = state.movies.filter((m) => m.id !== action.payload);
        },
        setWatchlistLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const {
    setWatchlist,
    addToWatchlistLocal,
    removeFromWatchlistLocal,
    setWatchlistLoading,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
