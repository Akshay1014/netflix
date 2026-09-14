import { useSelector } from "react-redux";
import { TMDB_IMG_ORIGINAL } from "../src/utils/constants";
import useMovieTrailer from "../src/hooks/useMovieTrailer";

const MainContainer = () => {
    const nowPlayingMovies = useSelector(
        (store) => store.movies.nowPlayingMovies
    );
    const trailerMovie = useSelector((store) => store.movies.trailerMovie);

    const mainMovie = nowPlayingMovies?.[0];

    // Fetch trailer for the main movie
    useMovieTrailer(mainMovie?.id);

    if (!mainMovie) {
        // Skeleton loading state
        return (
            <div className="w-full h-screen bg-gray-900 animate-pulse flex items-end pb-48 px-12">
                <div className="space-y-3">
                    <div className="w-64 h-8 bg-gray-700 rounded" />
                    <div className="w-96 h-4 bg-gray-700 rounded" />
                    <div className="w-80 h-4 bg-gray-700 rounded" />
                    <div className="flex gap-3 mt-4">
                        <div className="w-28 h-10 bg-gray-700 rounded" />
                        <div className="w-28 h-10 bg-gray-700 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background: YouTube Trailer or Backdrop */}
            {trailerMovie ? (
                <iframe
                    className="absolute top-0 left-0 w-full h-full scale-[1.15] pointer-events-none"
                    src={`https://www.youtube.com/embed/${trailerMovie.key}?autoplay=1&mute=1&loop=1&playlist=${trailerMovie.key}&controls=0&showinfo=0&rel=0`}
                    title="trailer"
                    allow="autoplay"
                />
            ) : (
                <img
                    className="w-full h-full object-cover"
                    src={TMDB_IMG_ORIGINAL + mainMovie.backdrop_path}
                    alt={mainMovie.title}
                />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />

            {/* Content */}
            <div className="absolute bottom-36 left-8 md:left-16 text-white max-w-lg">
                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight drop-shadow-2xl">
                    {mainMovie.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="text-green-400 font-bold">
                        {Math.round(mainMovie.vote_average * 10)}% Match
                    </span>
                    <span className="text-gray-300">
                        {mainMovie.release_date?.slice(0, 4)}
                    </span>
                    <span className="border border-gray-500 text-gray-300 px-1 text-xs rounded">
                        HD
                    </span>
                </div>

                {/* Overview */}
                <p className="text-sm md:text-base text-gray-200 line-clamp-3 mb-5 leading-relaxed">
                    {mainMovie.overview}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-300 transition-all duration-200 text-sm md:text-base">
                        <span className="text-xl">▶</span> Play
                    </button>
                    <button className="flex items-center gap-2 bg-gray-600/70 text-white font-bold px-6 py-3 rounded hover:bg-gray-600 transition-all duration-200 text-sm md:text-base backdrop-blur-sm">
                        <span className="text-xl">ℹ</span> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;