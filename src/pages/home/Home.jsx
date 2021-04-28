import "./home.css";
import Carousel from "./component/carousel/Carousel";
import Categories from "./component/categories/Categories";

const Home = () => {
    return (
        <>
            <Categories />
            <Carousel />
        </>
    );
};

export default Home;
