import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNowPlayingMovies } from "../utils/moviesSlice";
import API_OPTIONS, { TMDB_NOW_PLAYING } from "../utils/constants";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

    const fetchNowPlayingMovies = async () => {
        try {
            const data = await fetch(TMDB_NOW_PLAYING, API_OPTIONS);
            const json = await data.json();
            dispatch(setNowPlayingMovies(json.results));
        } catch (err) {
            console.error("Error fetching now playing movies:", err);
        }
    };

    useEffect(() => {
        if (!nowPlayingMovies) fetchNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
