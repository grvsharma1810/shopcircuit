import "./home.css";
import Carousel from "./component/carousel/Carousel";
import Categories from "./component/categories/Categories";
import Footer from "../shared-components/footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Categories />
            <Carousel />
            <div className="text-center m-1">
                <button
                    onClick={() => navigate("/products")}
                    className="btn-solid bg-red-800 large"
                >
                    Shop Now
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
