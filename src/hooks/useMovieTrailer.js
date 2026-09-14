import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTrailerMovie } from "../utils/moviesSlice";
import API_OPTIONS from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const fetchTrailer = async () => {
        if (!movieId) return;
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos`,
                API_OPTIONS
            );
            const json = await data.json();
            const filterTrailers = json.results.filter(
                (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            const trailer =
                filterTrailers.length > 0 ? filterTrailers[0] : json.results[0];
            dispatch(setTrailerMovie(trailer));
        } catch (err) {
            console.error("Error fetching trailer:", err);
        }
    };

    useEffect(() => {
        fetchTrailer();
    }, [movieId]);
};

export default useMovieTrailer;
