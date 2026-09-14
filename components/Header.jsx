import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../src/utils/firebase";
import { clearUser } from "../src/utils/userSlice";
import { toggleGeminiSearch } from "../src/utils/geminiSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGeminiSearch = useSelector(
        (store) => store.gemini.showGeminiSearch
    );

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            navigate("/login");
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    const handleToggleAI = () => {
        dispatch(toggleGeminiSearch());
    };

    return (
        <div className="absolute top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-gradient-to-b from-black/90 via-black/40 to-transparent z-50">
            {/* Logo */}
            <Link to="/">
                <img
                    className="w-24 md:w-32 object-contain cursor-pointer hover:brightness-110 transition"
                    src="/logo.png"
                    alt="Netflix"
                />
            </Link>

            {/* Right Section */}
            {user ? (
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Watchlist Link */}
                    <Link
                        to="/watchlist"
                        className="hidden md:flex items-center gap-1 text-white text-sm font-medium hover:text-gray-300 transition"
                    >
                        <span>🔖</span>
                        <span>My List</span>
                    </Link>

                    {/* AI Search Toggle */}
                    <button
                        onClick={handleToggleAI}
                        className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all duration-300 ${
                            showGeminiSearch
                                ? "bg-white text-black"
                                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                        }`}
                    >
                        <span>✨</span>
                        <span className="hidden sm:inline">
                            {showGeminiSearch ? "Browse" : "AI Search"}
                        </span>
                    </button>

                    {/* User Avatar */}
                    <div className="relative group">
                        <img
                            className="w-8 h-8 md:w-9 md:h-9 rounded cursor-pointer ring-2 ring-transparent group-hover:ring-white transition"
                            src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.email || "U"
                                )}&background=e50914&color=fff`
                            }
                            alt="avatar"
                        />
                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-white/10 rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="px-4 py-2 border-b border-white/10">
                                <p className="text-white text-xs font-semibold truncate">
                                    {user.displayName || user.email}
                                </p>
                                {user.displayName && (
                                    <p className="text-gray-400 text-xs truncate">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                            <Link
                                to="/watchlist"
                                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 text-sm transition"
                            >
                                🔖 My Watchlist
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 text-sm transition"
                            >
                                🚪 Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Link
                    to="/login"
                    className="bg-[#e50914] text-white text-sm font-semibold px-5 py-2 rounded hover:bg-[#c11119] transition"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default Header;