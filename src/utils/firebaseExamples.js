// ===== FIREBASE USAGE EXAMPLES =====

import { 
    insertData, 
    fetchAllData, 
    fetchDataById, 
    fetchDataWithFilter, 
    updateData, 
    deleteData 
} from "./firebase";

// ===== EXAMPLE 1: Insert User Data =====
export const addUserData = async (userName, email, subscription) => {
    try {
        const userId = await insertData("users", {
            name: userName,
            email: email,
            subscription: subscription,
            joinedDate: new Date().toISOString()
        });
        return userId;
    } catch (error) {
        console.error("Failed to add user:", error);
    }
};

// ===== EXAMPLE 2: Insert Movie/Show Data =====
export const addMovieData = async (title, genre, rating, duration) => {
    try {
        const movieId = await insertData("movies", {
            title: title,
            genre: genre,
            rating: rating,
            duration: duration,
            watched: false
        });
        return movieId;
    } catch (error) {
        console.error("Failed to add movie:", error);
    }
};

// ===== EXAMPLE 3: Fetch All Users =====
export const getAllUsers = async () => {
    try {
        const users = await fetchAllData("users");
        console.log("All users:", users);
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};

// ===== EXAMPLE 4: Fetch All Movies =====
export const getAllMovies = async () => {
    try {
        const movies = await fetchAllData("movies");
        console.log("All movies:", movies);
        return movies;
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
};

// ===== EXAMPLE 5: Get Single Movie By ID =====
export const getMovieById = async (movieId) => {
    try {
        const movie = await fetchDataById("movies", movieId);
        return movie;
    } catch (error) {
        console.error("Failed to fetch movie:", error);
    }
};

// ===== EXAMPLE 6: Search User by Email =====
export const getUserByEmail = async (email) => {
    try {
        const users = await fetchDataWithFilter("users", "email", email);
        return users[0] || null;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};

// ===== EXAMPLE 7: Get Movies by Genre =====
export const getMoviesByGenre = async (genre) => {
    try {
        const movies = await fetchDataWithFilter("movies", "genre", genre);
        return movies;
    } catch (error) {
        console.error("Failed to fetch movies by genre:", error);
    }
};

// ===== EXAMPLE 8: Update User Subscription =====
export const updateUserSubscription = async (userId, newSubscription) => {
    try {
        await updateData("users", userId, {
            subscription: newSubscription
        });
    } catch (error) {
        console.error("Failed to update subscription:", error);
    }
};

// ===== EXAMPLE 9: Mark Movie as Watched =====
export const markMovieAsWatched = async (movieId) => {
    try {
        await updateData("movies", movieId, {
            watched: true,
            watchedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Failed to mark movie as watched:", error);
    }
};

// ===== EXAMPLE 10: Delete User Account =====
export const deleteUserAccount = async (userId) => {
    try {
        await deleteData("users", userId);
    } catch (error) {
        console.error("Failed to delete user:", error);
    }
};

// ===== EXAMPLE 11: Insert Watchlist Entry =====
export const addToWatchlist = async (userId, movieId, movieTitle) => {
    try {
        const watchlistId = await insertData("watchlist", {
            userId: userId,
            movieId: movieId,
            movieTitle: movieTitle,
            addedAt: new Date().toISOString()
        });
        return watchlistId;
    } catch (error) {
        console.error("Failed to add to watchlist:", error);
    }
};

// ===== EXAMPLE 12: Get User's Watchlist =====
export const getUserWatchlist = async (userId) => {
    try {
        const watchlist = await fetchDataWithFilter("watchlist", "userId", userId);
        return watchlist;
    } catch (error) {
        console.error("Failed to fetch watchlist:", error);
    }
};