import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const { nowPlayingMovies, popularMovies, topRatedMovies, trendingMovies } =
        useSelector((store) => store.movies);

    return (
        <div className="bg-black -mt-40 relative z-10 pb-12">
            <MovieList title="🔥 Trending Today" movies={trendingMovies} />
            <MovieList title="▶ Now Playing" movies={nowPlayingMovies} />
            <MovieList title="⭐ Popular" movies={popularMovies} />
            <MovieList title="🏆 Top Rated" movies={topRatedMovies} />
        </div>
    );
};

export default SecondaryContainer;