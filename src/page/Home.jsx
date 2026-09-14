import Nav from "../component/Nav";
import Trends from "../component/Trends";
import Reasons from "../../components/Reasons";
import Questions from "../../components/Questions";
import Subscrition from "../../components/Subscrition";
import Footer from "../../components/Footer";


const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <Nav />
            <Trends />
            <Reasons />
            <Questions />
            <Subscrition />
            <Footer />
        </div>
    );
};

export default Home;