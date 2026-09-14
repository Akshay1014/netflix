import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingMovies } from "../utils/moviesSlice";
import API_OPTIONS, { TMDB_TRENDING } from "../utils/constants";

const useTrendingMovies = () => {
    const dispatch = useDispatch();
    const trendingMovies = useSelector((store) => store.movies.trendingMovies);

    const fetchTrendingMovies = async () => {
        try {
            const data = await fetch(TMDB_TRENDING, API_OPTIONS);
            const json = await data.json();
            dispatch(setTrendingMovies(json.results));
        } catch (err) {
            console.error("Error fetching trending movies:", err);
        }
    };

    useEffect(() => {
        if (!trendingMovies) fetchTrendingMovies();
    }, []);
};

export default useTrendingMovies;
