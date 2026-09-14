import { useState } from "react";
import { TMDB_IMG_BASE } from "../src/utils/constants";
import useWatchlist from "../src/hooks/useWatchlist";

const MovieCard = ({ movie }) => {
    const [hovered, setHovered] = useState(false);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    if (!movie || !movie.poster_path) return null;

    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistClick = (e) => {
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(movie);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <div
            className="relative flex-shrink-0 w-40 md:w-48 cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Poster */}
            <img
                className={`w-full h-60 md:h-72 object-cover rounded-md transition-all duration-300 ${
                    hovered ? "scale-105 brightness-75" : "scale-100 brightness-100"
                }`}
                src={TMDB_IMG_BASE + movie.poster_path}
                alt={movie.title}
            />

            {/* Hover Overlay */}
            {hovered && (
                <div className="absolute inset-0 flex flex-col justify-end rounded-md p-3 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs font-semibold">
                            {movie.vote_average?.toFixed(1)}
                        </span>
                    </div>

                    {/* Title */}
                    <p className="text-white text-xs font-bold leading-tight line-clamp-2 mb-2">
                        {movie.title}
                    </p>

                    {/* Watchlist Button */}
                    <button
                        onClick={handleWatchlistClick}
                        className={`w-full py-1 rounded text-xs font-bold transition-all duration-200 ${
                            inWatchlist
                                ? "bg-white/20 text-white border border-white/40 hover:bg-red-600 hover:border-red-600"
                                : "bg-white text-black hover:bg-gray-200"
                        }`}
                    >
                        {inWatchlist ? "✓ Added" : "+ Watchlist"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
