import "./products.css";
import ProductListing from "./components/products-list/ProductList";
import Sidebar from "./components/products-sidebar/ProductsSidebar";
import { useData } from "../../providers/DataProvider";
import { ProductsProvider } from "./ProductsProvider";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import SortIcon from "@material-ui/icons/Sort";

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

    const openSidebar = () => {
        sidebarRef.current.style.left = "0";
        sidebarRef.current.style.padding = "1rem";
    };

    const closeSidebar = () => {
        sidebarRef.current.style.left = "-100%";
        sidebarRef.current.style.padding = "0";
    };

    return (
        <ProductsProvider>
            <Sidebar closeSidebar={closeSidebar} ref={sidebarRef} />
            <div className="products">
                <ProductListing
                    products={getFilteredProductsByCategory(
                        products,
                        categoryName
                    )}
                />
            </div>
            <button
                onClick={() => openSidebar()}
                className="btn-floating-action primary sort-filter"
            >
                <SortIcon />
            </button>
        </ProductsProvider>
    );
};

export default Products;
