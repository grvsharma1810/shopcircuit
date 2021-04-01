import './products.css'
import ProductListing from "./product-list/product-list"
import Sidebar from "./sidebar/sidebar";
import { ProductsProvider } from './products-context';

const Products = () => {
    return (
        <div id="products">
            <ProductsProvider>
                <div className="p-1">
                    <Sidebar />
                </div>
                <div className="p-1">
                    <ProductListing />
                </div>
            </ProductsProvider>
        </div>
    )
}

export default Products;