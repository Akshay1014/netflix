import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../src/utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;