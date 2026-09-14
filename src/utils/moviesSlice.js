import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        trendingMovies: null,
        trailerMovie: null,
    },
    reducers: {
        setNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        setTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        setTrailerMovie: (state, action) => {
            state.trailerMovie = action.payload;
        },
    },
});

export const {
    setNowPlayingMovies,
    setPopularMovies,
    setTopRatedMovies,
    setTrendingMovies,
    setTrailerMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
