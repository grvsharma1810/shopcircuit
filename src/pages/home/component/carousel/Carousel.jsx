import "./carousel.css";
import { CarouselData } from "./carousel-data";
import { useEffect, useState, useRef } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const Carousel = () => {
    const carouselRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const styles = {
        backgroundImage: `url(${CarouselData[currentImageIndex]})`,
    };

    const nextSlide = () => {
        currentImageIndex + 1 === CarouselData.length
            ? setCurrentImageIndex(() => 0)
            : setCurrentImageIndex((index) => index + 1);
    };

    const previousSlide = () => {
        currentImageIndex - 1 === -1
            ? setCurrentImageIndex(() => CarouselData.length - 1)
            : setCurrentImageIndex((index) => index - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, [currentImageIndex]);

    return (
        <div className="carousel" style={styles} ref={carouselRef}>
            <div className={`carousel-arrow left`} onClick={previousSlide}>
                <ArrowLeftIcon style={{ fontSize: "3rem" }} />
            </div>
            <div className={`carousel-arrow right`} onClick={nextSlide}>
                <ArrowRightIcon style={{ fontSize: "3rem" }}/>
            </div>
        </div>
    );
};

export default Carousel;
