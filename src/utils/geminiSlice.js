import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        showGeminiSearch: false,
        geminiMovies: null,
        geminiQuery: "",
        isSearching: false,
        searchError: null,
        isFallback: false,
    },
    reducers: {
        toggleGeminiSearch: (state) => {
            state.showGeminiSearch = !state.showGeminiSearch;
            // Reset results when closing
            if (!state.showGeminiSearch) {
                state.geminiMovies = null;
                state.geminiQuery = "";
                state.searchError = null;
                state.isFallback = false;
            }
        },
        setGeminiQuery: (state, action) => {
            state.geminiQuery = action.payload;
        },
        setGeminiMovies: (state, action) => {
            state.geminiMovies = action.payload;
        },
        setGeminiResults: (state, action) => {
            state.geminiMovies = action.payload.movies;
            state.isFallback = action.payload.isFallback || false;
            state.searchError = action.payload.error || null;
        },
        clearGeminiSearch: (state) => {
            state.geminiMovies = null;
            state.geminiQuery = "";
            state.isSearching = false;
            state.searchError = null;
            state.isFallback = false;
        },
        setSearchLoading: (state, action) => {
            state.isSearching = action.payload;
        },
        setSearchError: (state, action) => {
            state.searchError = action.payload;
        },
    },
});

export const {
    toggleGeminiSearch,
    setGeminiQuery,
    setGeminiMovies,
    setGeminiResults,
    clearGeminiSearch,
    setSearchLoading,
    setSearchError,
} = geminiSlice.actions;

export default geminiSlice.reducer;

