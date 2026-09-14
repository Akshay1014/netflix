import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import {
    setWatchlist,
    addToWatchlistLocal,
    removeFromWatchlistLocal,
} from "../utils/watchlistSlice";

const useWatchlist = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const watchlist = useSelector((store) => store.watchlist.movies);

    // Real-time listener to Firestore watchlist
    useEffect(() => {
        if (!user?.uid) return;

        const q = query(collection(db, "users", user.uid, "watchlist"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const movies = snapshot.docs.map((docSnap) => ({
                firestoreId: docSnap.id,
                ...docSnap.data(),
            }));
            dispatch(setWatchlist(movies));
        });

        return () => unsubscribe();
    }, [user?.uid, dispatch]);

    const addToWatchlist = async (movie) => {
        if (!user?.uid) return;
        const alreadyAdded = watchlist.find((m) => m.id === movie.id);
        if (alreadyAdded) return;

        // Optimistic update
        dispatch(addToWatchlistLocal(movie));

        try {
            await addDoc(collection(db, "users", user.uid, "watchlist"), {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                overview: movie.overview,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                addedAt: serverTimestamp(),
            });
        } catch (err) {
            console.error("Error adding to watchlist:", err);
            dispatch(removeFromWatchlistLocal(movie.id));
        }
    };

    const removeFromWatchlist = async (movie) => {
        if (!user?.uid || !movie.firestoreId) return;
        dispatch(removeFromWatchlistLocal(movie.id));
        try {
            await deleteDoc(
                doc(db, "users", user.uid, "watchlist", movie.firestoreId)
            );
        } catch (err) {
            console.error("Error removing from watchlist:", err);
            dispatch(addToWatchlistLocal(movie));
        }
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some((m) => m.id === movieId);
    };

    return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};

export default useWatchlist;
