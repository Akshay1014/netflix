import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { setUser, clearUser } from "../utils/userSlice";

const useAuthListener = (navigate) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Serialize only the safe fields to avoid non-serializable objects in Redux
                dispatch(
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    })
                );
                if (navigate && (window.location.pathname === "/login" || window.location.pathname === "/signup")) {
                    navigate("/browse");
                }
            } else {
                dispatch(clearUser());
                if (navigate && (window.location.pathname === "/browse" || window.location.pathname === "/watchlist")) {
                    navigate("/login");
                }
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);
};

export default useAuthListener;
