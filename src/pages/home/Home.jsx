import "./home.css";
import Carousel from "./component/carousel/Carousel";
import Categories from "./component/categories/Categories";
import Footer from "../shared-components/footer/Footer";
import { getLanguageLabel } from "../../utils/getLanguageLabel";
import { useNavigate } from "react-router-dom";
import { useLocalisation } from "../../providers/LocalisationProvider";

const Home = () => {
    const navigate = useNavigate();
    const {
        localisationState: { languageIndex },
    } = useLocalisation();

    return (
        <>
            <Categories />
            <Carousel />
            <div className="text-center">
                <p className="text-size-3 bg-secondary p-1">
                    {getLanguageLabel("get_all_your_music_related",languageIndex)}
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="btn-solid bg-red-800 large m-1"
                >
                    {getLanguageLabel("shop_now",languageIndex)}
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Home;
