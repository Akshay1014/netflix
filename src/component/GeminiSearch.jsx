import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGeminiSearch, setGeminiQuery } from "../utils/geminiSlice";
import useGeminiSearch from "../hooks/useGeminiSearch";
import MovieList from "../../components/MovieList";

const GeminiSearch = () => {
    const dispatch = useDispatch();
    const { searchMovies } = useGeminiSearch();
    const { geminiMovies, isSearching, geminiQuery, searchError, isFallback } = useSelector(
        (store) => store.gemini
    );
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isSearching) return;
        dispatch(setGeminiQuery(inputValue));
        await searchMovies(inputValue);
    };

    const handleClear = () => {
        setInputValue("");
        dispatch(clearGeminiSearch());
        inputRef.current?.focus();
    };

    const suggestions = [
        "Scary movies from the 90s",
        "Feel-good romantic comedies",
        "Sci-fi about time travel",
        "Action movies with a female lead",
        "Oscar winning dramas",
    ];

    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-6 md:px-16">
            {/* Search Header */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-sm">
                        ✨
                    </div>
                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                        AI Movie Search
                    </h2>
                </div>
                <p className="text-gray-400 text-sm md:text-base ml-11">
                    Powered by Google Gemini — describe any movie in natural language
                </p>
            </div>

            {/* Error / Fallback Banner */}
            {searchError && (
                <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-2.5">
                        <span className="text-lg">ℹ️</span>
                        <span>{searchError}</span>
                    </div>
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                    >
                        Get Gemini Key
                    </a>
                </div>
            )}

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <div className="flex items-center gap-3 bg-[#1a1a2e] border border-purple-500/30 rounded-xl px-5 py-4 focus-within:border-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/20">
                        {/* Gemini Icon */}
                        <span className="text-2xl flex-shrink-0">✨</span>

                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Try "action movies set in space" or "sad romantic drama"...'
                            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
                            autoFocus
                        />

                        {/* Clear Button */}
                        {(inputValue || geminiMovies) && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-gray-400 hover:text-white transition text-xl flex-shrink-0 cursor-pointer"
                            >
                                ✕
                            </button>
                        )}

                        {/* Search Button */}
                        <button
                            type="submit"
                            disabled={isSearching || !inputValue.trim()}
                            className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer"
                        >
                            {isSearching ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Searching
                                </span>
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </form>

                {/* Suggestion Pills */}
                {!geminiMovies && !isSearching && (
                    <div className="mt-5">
                        <p className="text-gray-500 text-xs mb-3 uppercase tracking-widest">
                            Try these
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => {
                                        setInputValue(s);
                                        searchMovies(s);
                                        dispatch(setGeminiQuery(s));
                                    }}
                                    className="bg-white/5 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-gray-300 hover:text-white text-xs px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {isSearching && (
                <div className="max-w-3xl mx-auto mt-12 text-center">
                    <div className="inline-flex items-center gap-3 text-purple-400 text-lg">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span>Gemini is thinking...</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                        Analyzing your request and finding the best matches
                    </p>
                </div>
            )}

            {/* Results */}
            {geminiMovies && !isSearching && (
                <div className="mt-10">
                    {geminiMovies.length > 0 ? (
                        <>
                            <div className="max-w-3xl mx-auto mb-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                <p className="text-gray-400 text-sm">
                                    <span className="text-purple-400 font-semibold">
                                        {geminiMovies.length} results
                                    </span>{" "}
                                    for "{geminiQuery}" {isFallback ? "(TMDB direct)" : "(AI AI-recommended)"}
                                </p>
                                <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
                            </div>
                            <MovieList
                                title={isFallback ? "🎬 Search Results" : "✨ AI Recommended"}
                                movies={geminiMovies}
                            />
                        </>
                    ) : (
                        <div className="max-w-3xl mx-auto mt-12 text-center">
                            <p className="text-gray-400 text-lg">
                                No results found. Try a different description.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GeminiSearch;
