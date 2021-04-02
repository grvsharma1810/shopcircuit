import './products.css'
import ProductListing from "./product-list/product-list"
import Sidebar from "./sidebar/sidebar";
import { ProductsProvider } from './products-context';
import { useRef } from 'react';

const Products = () => {

    const sidebarRef = useRef(null)

    const openSidebar = () => {
        console.log(sidebarRef);
        sidebarRef.current.style.left = '0'
        sidebarRef.current.style.padding = '1rem'        
    }

    const closeSidebar = () => {
        sidebarRef.current.style.left = '-100%'
        sidebarRef.current.style.padding = '0'        
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