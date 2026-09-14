import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopRatedMovies } from "../utils/moviesSlice";
import API_OPTIONS, { TMDB_TOP_RATED } from "../utils/constants";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

    const fetchTopRatedMovies = async () => {
        try {
            const data = await fetch(TMDB_TOP_RATED, API_OPTIONS);
            const json = await data.json();
            dispatch(setTopRatedMovies(json.results));
        } catch (err) {
            console.error("Error fetching top rated movies:", err);
        }
    };

    useEffect(() => {
        if (!topRatedMovies) fetchTopRatedMovies();
    }, []);
};

export default useTopRatedMovies;
