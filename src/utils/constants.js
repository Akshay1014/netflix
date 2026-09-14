// TMDB API Options (uses Read Access Token from .env)
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
};
export default API_OPTIONS;

// TMDB Endpoints
export const TMDB_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing";
export const TMDB_POPULAR = "https://api.themoviedb.org/3/movie/popular";
export const TMDB_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated";
export const TMDB_TRENDING = "https://api.themoviedb.org/3/trending/movie/day";
export const TMDB_SEARCH = "https://api.themoviedb.org/3/search/movie";

// Image base URLs
export const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";