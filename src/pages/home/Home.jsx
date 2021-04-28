import "./home.css";
import Carousel from "./component/carousel/Carousel";
import Categories from "./component/categories/Categories";
import Footer from "../shared-components/footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Categories />
            <Carousel />
            <div className="text-center">
                <p className="text-size-3 bg-secondary p-1">
                    Get all your music related products here at one place to
                    create beautiful beats.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="btn-solid bg-red-800 large m-1"
                >
                    Shop Now
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Home;
