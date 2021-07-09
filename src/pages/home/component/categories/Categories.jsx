import "./categories.css";
import { CategoriesData } from "./categories-data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className="categories pb-1">
            {CategoriesData.map((category) => {
                return (
                    <div
                        onClick={() =>
                            navigate(`/products?category=${category.name}`)
                        }
                        className="category text-center"
                    >
                        <div className="category-img">
                            <img src={category.image} />
                        </div>
                        <span>{category.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;
