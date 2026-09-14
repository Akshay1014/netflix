import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login = ({ isSignUpInitial = false }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Check if pathname is /signup or passed as prop
    const isSignUpPath = location.pathname === "/signup" || isSignUpInitial;
    const [isSignInForm, setIsSignInForm] = useState(!isSignUpPath);
    
    // Read email query parameter if provided from home page
    const queryEmail = new URLSearchParams(location.search).get("email") || "";
    
    const [email, setEmail] = useState(queryEmail);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsSignInForm(!isSignUpPath);
    }, [isSignUpPath]);

    // Validation helper
    const validateInputs = () => {
        let isValid = true;
        
        // Email validation
        if (!email) {
            setEmailError("Please enter a valid email or phone number.");
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError("Please enter a valid email address.");
                isValid = false;
            } else {
                setEmailError("");
            }
        }

        // Password validation
        if (!password) {
            setPasswordError("Your password must contain between 4 and 60 characters.");
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError("Your password must contain at least 4 characters.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");
        
        if (!validateInputs()) return;

        setIsSubmitting(true);

        if (isSignInForm) {
            // --- SIGN IN FLOW ---
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/browse");
            } catch (err) {
                console.error("Sign in error:", err);
                setIsSubmitting(false);
                if (err.code === "auth/configuration-not-found") {
                    setGeneralError("Email/Password Sign-In is not enabled in Firebase Console. Please go to Firebase Console > Authentication > Sign-in method and enable Email/Password.");
                } else if (
                    err.code === "auth/invalid-credential" ||
                    err.code === "auth/wrong-password" ||
                    err.code === "auth/user-not-found"
                ) {
                    setPasswordError("Incorrect password or user not found. Please try again.");
                } else {
                    setGeneralError(err.message || "An authentication error occurred. Please try again.");
                }
            }
        } else {
            // --- SIGN UP FLOW ---
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (name && userCredential.user) {
                    await updateProfile(userCredential.user, {
                        displayName: name
                    });
                }
                navigate("/browse");
            } catch (err) {
                console.error("Sign up error:", err);
                setIsSubmitting(false);
                if (err.code === "auth/configuration-not-found") {
                    setGeneralError("Email/Password Sign-In is not enabled in Firebase Console. Please go to Firebase Console > Authentication > Sign-in method and enable Email/Password.");
                } else if (err.code === "auth/email-already-in-use") {
                    setEmailError("An account already exists with this email address. Please sign in.");
                } else if (err.code === "auth/weak-password") {
                    setPasswordError("Password should be at least 6 characters.");
                } else {
                    setGeneralError(err.message || "An error occurred during sign up. Please try again.");
                }
            }
        }
    };

    const toggleFormMode = () => {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
        const newMode = !isSignInForm;
        setIsSignInForm(newMode);
        navigate(newMode ? "/login" : "/signup", { replace: true });
    };

    return (
        <div className="w-full min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#3a0d10] via-[#0f0203] to-[#000000] selection:bg-[#e50914] selection:text-white font-sans">
            {/* Header Logo */}
            <header className="w-full px-6 py-4 md:px-16 flex justify-between items-center z-10">
                <Link to="/" className="cursor-pointer transition hover:brightness-110">
                    <img
                        className="w-32 md:w-44 object-contain"
                        src="/logo.png"
                        alt="Netflix Logo"
                    />
                </Link>
            </header>

            {/* Main Auth Container */}
            <main className="flex-grow flex items-center justify-center px-4 py-8 z-10">
                <div className="w-full max-w-[450px] bg-black/75 border border-white/10 rounded-lg p-8 md:p-12 text-white shadow-2xl backdrop-blur-md">
                    <h1 className="text-3xl font-bold mb-8">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {generalError && (
                        <div className="bg-[#e50914]/20 border border-[#e50914] text-white text-sm p-3.5 rounded mb-6 flex items-center gap-2">
                            <span>⚠️</span>
                            <span>{generalError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name input (only for Sign Up) */}
                        {!isSignInForm && (
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder=" "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="peer w-full h-[56px] px-4 pt-5 pb-1 rounded bg-[#161616]/90 text-white border border-gray-600/50 hover:border-gray-400 focus:border-white outline-none transition-colors text-[16px]"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 top-4 text-[#8c8c8c] text-[16px] transition-all duration-150 transform -translate-y-3 scale-75 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                                >
                                    Full Name
                                </label>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                                className={`peer w-full h-[56px] px-4 pt-5 pb-1 rounded bg-[#161616]/90 text-white border ${
                                    emailError ? "border-[#e50914]" : "border-gray-600/50 hover:border-gray-400 focus:border-white"
                                } outline-none transition-colors text-[16px]`}
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-4 text-[#8c8c8c] text-[16px] transition-all duration-150 transform -translate-y-3 scale-75 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                            >
                                Email address
                            </label>
                        </div>
                        {emailError && (
                            <p className="text-[#e50914] text-xs mt-1 font-medium">{emailError}</p>
                        )}

                        {/* Password Input */}
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                className={`peer w-full h-[56px] pl-4 pr-16 pt-5 pb-1 rounded bg-[#161616]/90 text-white border ${
                                    passwordError ? "border-[#e50914]" : "border-gray-600/50 hover:border-gray-400 focus:border-white"
                                } outline-none transition-colors text-[16px]`}
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-4 text-[#8c8c8c] text-[16px] transition-all duration-150 transform -translate-y-3 scale-75 origin-[0] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-xs text-gray-400 hover:text-white transition select-none cursor-pointer font-medium"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-[#e50914] text-xs mt-1 font-medium">{passwordError}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 mt-4 bg-[#e50914] hover:bg-[#c11119] text-white font-bold rounded hover:shadow-lg transition-all duration-200 text-[16px] cursor-pointer flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : isSignInForm ? (
                                "Sign In"
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    {/* Toggle Form Mode Link */}
                    <div className="mt-8 text-gray-400 text-sm flex items-center gap-1.5">
                        <span>
                            {isSignInForm ? "New to Netflix?" : "Already have an account?"}
                        </span>
                        <button
                            onClick={toggleFormMode}
                            className="text-white hover:underline font-semibold cursor-pointer"
                        >
                            {isSignInForm ? "Sign up now." : "Sign in now."}
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-gray-500 leading-relaxed">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center z-10 border-t border-white/10 bg-black/40">
                <span className="text-xs text-gray-500">
                    &copy; 2026 Netflix Clone. All rights reserved.
                </span>
            </footer>
        </div>
    );
};

export default Login;