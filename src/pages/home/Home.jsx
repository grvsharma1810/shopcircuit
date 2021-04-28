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
            <div
                onClick={() => navigate("/products")}
                className="text-center m-1"
            >
                <button className="btn-solid bg-red-800 large">Shop Now</button>
            </div>
            <Footer />
        </>
    );
};

export default Home;
