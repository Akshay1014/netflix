import { Routes, Route, useNavigate } from "react-router-dom";
import useAuthListener from "./hooks/useAuthListener";

// Import Pages
import Home from "./page/Home";
import Browse from "./page/Browse";
import Login from "./page/Login";
import Watchlist from "./page/Watchlist";

const Navbar = () => {
    const navigate = useNavigate();

    // Sync Firebase auth state to Redux + handle redirects
    useAuthListener(navigate);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/login" element={<Login isSignUpInitial={false} />} />
            <Route path="/signup" element={<Login isSignUpInitial={true} />} />
            <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
    );
};

export default Navbar;
