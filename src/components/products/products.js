import './products.css'
import ProductListing from "./product-list/product-list"
import Sidebar from "./sidebar/sidebar";
import { ProductsProvider } from './products-context';
import { useRef } from 'react';

const Products = () => {

    const sidebarRef = useRef(null)

    const openSidebar = () => {
        console.log(sidebarRef);
        sidebarRef.current.classList.add('active')
    }

    const closeSidebar = () => {
        sidebarRef.current.classList.remove('active')
    }

    return (
        <ProductsProvider>
            <Sidebar
                closeSidebar={closeSidebar}
                ref={sidebarRef} />
            <div className="products">
                <ProductListing
                    openSidebar={openSidebar} />
            </div>
        </ProductsProvider>
    )
}

export default Products;