import "./categories.css";
import { CategoriesData } from "./categories-data";

const Categories = () => {
    return (
        <div className="categories pb-1">
            {CategoriesData.map((category) => {
                return (
                    <div className="category text-center">
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
