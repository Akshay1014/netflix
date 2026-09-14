import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMovies } from "../utils/moviesSlice";
import API_OPTIONS, { TMDB_POPULAR } from "../utils/constants";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);

    const fetchPopularMovies = async () => {
        try {
            const data = await fetch(TMDB_POPULAR, API_OPTIONS);
            const json = await data.json();
            dispatch(setPopularMovies(json.results));
        } catch (err) {
            console.error("Error fetching popular movies:", err);
        }
    };

    useEffect(() => {
        if (!popularMovies) fetchPopularMovies();
    }, []);
};

export default usePopularMovies;
