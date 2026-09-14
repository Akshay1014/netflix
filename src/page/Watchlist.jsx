import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useWatchlist from "../hooks/useWatchlist";
import { TMDB_IMG_BASE } from "../utils/constants";

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();
    const user = useSelector((store) => store.user);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="px-6 md:px-16 pt-24 pb-8 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black">My Watchlist</h1>
                        <p className="text-gray-400 mt-1 text-sm">
                            {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
                        </p>
                    </div>
                    <Link
                        to="/browse"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        ← Browse
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-16 py-10">
                {watchlist.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-24 gap-6">
                        <div className="text-6xl">🎬</div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">
                                Your watchlist is empty
                            </h2>
                            <p className="text-gray-400 text-sm max-w-xs">
                                Browse movies and click "+ Watchlist" to save them here
                            </p>
                        </div>
                        <Link
                            to="/browse"
                            className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    /* Movie Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {watchlist.map((movie) => (
                            <div
                                key={movie.id}
                                className="group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                            >
                                {/* Poster */}
                                {movie.poster_path ? (
                                    <img
                                        src={TMDB_IMG_BASE + movie.poster_path}
                                        alt={movie.title}
                                        className="w-full h-56 md:h-72 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-56 md:h-72 bg-gray-800 flex items-center justify-center">
                                        <span className="text-4xl">🎬</span>
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                                    <p className="text-white text-xs font-bold line-clamp-2 mb-1">
                                        {movie.title}
                                    </p>
                                    {movie.vote_average && (
                                        <p className="text-yellow-400 text-xs mb-2">
                                            ★ {movie.vote_average?.toFixed(1)}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => removeFromWatchlist(movie)}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 rounded transition"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {/* Rating Badge */}
                                {movie.vote_average && (
                                    <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                                        ★ {movie.vote_average?.toFixed(1)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
