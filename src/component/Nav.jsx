import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bgImage.jpg";

const Nav = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        if (email) {
            navigate(`/signup?email=${encodeURIComponent(email)}`);
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-between bg-black text-white overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>

            {/* Top Navigation Header */}
            <header className="relative z-20 flex justify-between items-center px-6 md:px-16 py-6">
                <img
                    className="w-32 md:w-44 object-contain"
                    src="/logo.png"
                    alt="Netflix Logo"
                />
                <button
                    onClick={() => navigate("/login")}
                    className="bg-[#e50914] hover:bg-[#c11119] text-white px-5 py-2 rounded font-semibold text-sm transition cursor-pointer"
                >
                    Sign In
                </button>
            </header>

            {/* Hero Main Content */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
                    Unlimited movies, TV shows, and more
                </h1>
                <p className="text-lg md:text-2xl font-normal text-gray-200 mb-6">
                    Starts at ₹149. Cancel at any time.
                </p>
                <p className="text-base md:text-lg text-gray-300 mb-6">
                    Ready to watch? Enter your email to create or restart your membership.
                </p>

                <form
                    onSubmit={handleGetStarted}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl"
                >
                    <input
                        className="w-full bg-black/60 border border-gray-500/60 p-4 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white text-base"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-[#e50914] hover:bg-[#c11119] text-white font-bold text-lg px-8 py-4 rounded flex items-center justify-center gap-2 whitespace-nowrap transition cursor-pointer"
                    >
                        <span>Get Started</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </main>

            {/* Bottom Gradient Spacer */}
            <div className="relative z-10 h-12 bg-gradient-to-b from-transparent to-black" />
        </div>
    );
};

export default Nav;