import { useSelector } from "react-redux";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import SecondaryContainer from "../../components/SecondaryContainer";
import GeminiSearch from "../component/GeminiSearch";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";

const Browse = () => {
    // Fetch all movie categories when Browse mounts
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useTrendingMovies();

    const showGeminiSearch = useSelector(
        (store) => store.gemini.showGeminiSearch
    );

    return (
        <div className="bg-black min-h-screen">
            <Header />
            {showGeminiSearch ? (
                <GeminiSearch />
            ) : (
                <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            )}
        </div>
    );
};

export default Browse;