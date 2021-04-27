import "./carousel.css";
import { CarouselData } from "./carousel-data";

import { useEffect, useState, useRef } from "react";

const Carousel = () => {
    const carouselRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log(currentImageIndex);

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
    }, [currentImageIndex]);

    return (
        <div className="carousel" style={styles} ref={carouselRef}>
            <div className={`carousel-arrow left`} onClick={previousSlide}>
                <i className={`fa fa-caret-left`}></i>
            </div>
            <div className={`carousel-arrow right`} onClick={nextSlide}>
                <i className={`fa fa-caret-right`}></i>
            </div>
        </div>
    );
};

export default Carousel;
