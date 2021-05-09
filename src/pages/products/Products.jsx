import "./products.css";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductListing from "./components/products-list/ProductList";
import Sidebar from "./components/products-sidebar/ProductsSidebar";
import { useData } from "../../providers/DataProvider";
import { ProductsProvider } from "./ProductsProvider";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from "@material-ui/icons/Close";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const getFilteredProductsByCategory = (products, categoryName) => {
    if (categoryName) {
        return products.filter((product) => product.category === categoryName);
    }
    return products;
};

const Products = () => {
    const { dataState } = useData();
    const query = useQuery();
    const products = dataState.products;
    const categoryName = query.get("category");
    const sidebarRef = useRef(null);
    const [sidebarStatus, setSidebarStatus] = useState(false);

    const toggleSidebar = () => {
        if (sidebarStatus) {
            sidebarRef.current.style.left = "-100%";
            sidebarRef.current.style.padding = "0";
            setSidebarStatus(() => false);
        } else {
            sidebarRef.current.style.left = "0";
            sidebarRef.current.style.padding = "1rem";
            setSidebarStatus(() => true);
        }
    };

    return (
        <ProductsProvider>
            <Sidebar ref={sidebarRef} />
            <div className="products">
                <ProductListing
                    products={getFilteredProductsByCategory(
                        products,
                        categoryName
                    )}
                />
            </div>
            <button
                onClick={() => toggleSidebar()}
                className="btn-floating-action primary sort-filter"
            >
                {sidebarStatus ? <CloseIcon /> : <FilterListIcon />}
            </button>
        </ProductsProvider>
    );
};

export default Products;
