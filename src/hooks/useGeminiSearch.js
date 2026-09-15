import { useDispatch } from "react-redux";
import { setGeminiResults, setSearchLoading } from "../utils/geminiSlice";
import API_OPTIONS, { TMDB_SEARCH } from "../utils/constants";

const useGeminiSearch = () => {
    const dispatch = useDispatch();

    const searchMovies = async (query) => {
        if (!query.trim()) return;
        dispatch(setSearchLoading(true));

        try {
            // Step 1: Ask Gemini via our secure serverless function (/api/gemini)
            // The API key lives on the server — it is never sent to the browser.
            const geminiRes = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!geminiRes.ok) {
                throw new Error("GEMINI_API_ERROR");
            }

            const { text: textContent } = await geminiRes.json();

            if (!textContent) {
                throw new Error("EMPTY_GEMINI_RESPONSE");
            }

            const movieTitles = textContent
                .split(",")
                .map((t) => t.trim().replace(/^["']|["']$/g, ""))
                .filter(Boolean)
                .slice(0, 6);

            if (movieTitles.length === 0) {
                throw new Error("NO_RECOMMENDATIONS_PARSED");
            }

            // Step 2: Search TMDB for each movie title
            const movieSearchPromises = movieTitles.map((title) =>
                fetch(
                    `${TMDB_SEARCH}?query=${encodeURIComponent(title)}&include_adult=false`,
                    API_OPTIONS
                ).then((res) => res.json())
            );

            const movieSearchResults = await Promise.all(movieSearchPromises);

            // Step 3: Extract first result from each TMDB search
            const movies = movieSearchResults
                .map((res) => res.results?.[0])
                .filter(Boolean);

            if (movies.length === 0) {
                throw new Error("NO_TMDB_MATCHES");
            }

            dispatch(
                setGeminiResults({
                    movies,
                    isFallback: false,
                    error: null,
                })
            );
        } catch (err) {
            console.warn(
                "Gemini AI search unavailable/failed. Falling back to direct TMDB search:",
                err
            );

            // Fallback: Direct TMDB Search
            try {
                const res = await fetch(
                    `${TMDB_SEARCH}?query=${encodeURIComponent(query)}&include_adult=false`,
                    API_OPTIONS
                );
                const data = await res.json();
                const fallbackMovies = data.results || [];

                dispatch(
                    setGeminiResults({
                        movies: fallbackMovies,
                        isFallback: true,
                        error: "Notice: AI recommendation service unavailable. Showing direct TMDB search results.",
                    })
                );
            } catch (fallbackErr) {
                console.error("TMDB Fallback search error:", fallbackErr);
                dispatch(
                    setGeminiResults({
                        movies: [],
                        isFallback: true,
                        error: "Unable to search movies. Please check your network connection.",
                    })
                );
            }
        } finally {
            dispatch(setSearchLoading(false));
        }
    };

    return { searchMovies };
};

export default useGeminiSearch;
