import { useDispatch } from "react-redux";
import { getGeminiModel } from "../utils/gemini";
import { setGeminiResults, setSearchLoading } from "../utils/geminiSlice";
import API_OPTIONS, { TMDB_SEARCH } from "../utils/constants";

const useGeminiSearch = () => {
    const dispatch = useDispatch();

    const searchMovies = async (query) => {
        if (!query.trim()) return;
        dispatch(setSearchLoading(true));

        const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();
        const isApiKeyProvided = Boolean(apiKey && apiKey.length > 5);

        try {
            if (!isApiKeyProvided) {
                throw new Error("GEMINI_KEY_MISSING");
            }

            // Step 1: Ask Gemini for movie recommendations
            const prompt = `You are a movie recommendation expert. 
A user is searching for: "${query}"
Return ONLY a comma-separated list of exactly 5 movie titles that best match this description. 
Do not include any explanation, numbering, or extra text. Just the movie titles separated by commas.
Example format: Inception, Interstellar, The Matrix, Tenet, Avatar`;

            const geminiModel = getGeminiModel();
            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;
            const textContent = response.text();

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
                    `${TMDB_SEARCH}?query=${encodeURIComponent(
                        query
                    )}&include_adult=false`,
                    API_OPTIONS
                );
                const data = await res.json();
                const fallbackMovies = data.results || [];

                let errorNotice = "Notice: AI recommendation service unavailable. Showing direct TMDB search results.";
                if (err.message === "GEMINI_KEY_MISSING") {
                    errorNotice =
                        "Notice: Invalid or missing Gemini API Key in .env. Showing direct TMDB search results instead.";
                }

                dispatch(
                    setGeminiResults({
                        movies: fallbackMovies,
                        isFallback: true,
                        error: errorNotice,
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
