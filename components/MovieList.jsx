import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="px-6 md:px-12 mb-8">
                <h2 className="text-white text-xl font-bold mb-3">{title}</h2>
                {/* Skeleton Loader */}
                <div className="flex gap-3 overflow-x-hidden">
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                        <div
                            key={id}
                            className="flex-shrink-0 w-40 md:w-48 h-60 md:h-72 bg-gray-800 rounded-md animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 md:px-12 mb-8">
            <h2 className="text-white text-xl font-bold mb-3">{title}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;