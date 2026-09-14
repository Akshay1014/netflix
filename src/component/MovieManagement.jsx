import { useState, useEffect } from "react";
import {
    insertData,
    fetchAllData,
    fetchDataById,
    updateData,
    deleteData,
    fetchDataWithFilter
} from "../utils/firebase";

// ===== EXAMPLE COMPONENT: Movie Management =====
const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");

    // Fetch all movies when component mounts
    useEffect(() => {
        loadMovies();
    }, []);

    // Fetch all movies from Firestore
    const loadMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchAllData("movies");
            setMovies(data);
        } catch (error) {
            console.error("Error loading movies:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add new movie to Firestore
    const handleAddMovie = async (e) => {
        e.preventDefault();
        if (!title || !genre || !rating) {
            alert("Please fill all fields");
            return;
        }

        try {
            await insertData("movies", {
                title: title,
                genre: genre,
                rating: parseFloat(rating),
                watched: false
            });
            // Reset form
            setTitle("");
            setGenre("");
            setRating("");
            // Reload movies
            loadMovies();
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Failed to add movie");
        }
    };

    // Update movie (mark as watched)
    const handleMarkWatched = async (movieId) => {
        try {
            await updateData("movies", movieId, {
                watched: true,
                watchedAt: new Date().toISOString()
            });
            loadMovies();
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    // Delete movie
    const handleDeleteMovie = async (movieId) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await deleteData("movies", movieId);
                loadMovies();
            } catch (error) {
                console.error("Error deleting movie:", error);
            }
        }
    };

    if (loading) return <div className="text-white text-center">Loading...</div>;

    return (
        <div className="p-8 bg-gray-900 text-white rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Movie Management</h1>

            {/* Add Movie Form */}
            <form onSubmit={handleAddMovie} className="mb-8 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Movie Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    />
                    <input
                        type="text"
                        placeholder="Genre (Action, Drama, etc)"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    />
                    <input
                        type="number"
                        placeholder="Rating (0-10)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                        min="0"
                        max="10"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                    Add Movie
                </button>
            </form>

            {/* Movies List */}
            <div>
                <h2 className="text-xl font-bold mb-4">Movies List</h2>
                {movies.length === 0 ? (
                    <p className="text-gray-400">No movies found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {movies.map((movie) => (
                            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
                                <h3 className="text-lg font-bold">{movie.title}</h3>
                                <p className="text-gray-400">Genre: {movie.genre}</p>
                                <p className="text-yellow-400">Rating: {movie.rating}/10</p>
                                <p className={`text-sm ${movie.watched ? "text-green-400" : "text-red-400"}`}>
                                    {movie.watched ? "✓ Watched" : "Not Watched"}
                                </p>
                                <div className="mt-3 flex gap-2">
                                    {!movie.watched && (
                                        <button
                                            onClick={() => handleMarkWatched(movie.id)}
                                            className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-700"
                                        >
                                            Mark Watched
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteMovie(movie.id)}
                                        className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieManagement;