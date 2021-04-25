import './products.css'
import ProductListing from "./components/product-list/ProductList"
import Sidebar from "./components/sidebar/Sidebar";
import { ProductsProvider } from './ProductsProvider';
import { useRef } from 'react';

const Products = () => {        

    const sidebarRef = useRef(null)    

    const openSidebar = () => {        
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
                    <ProductListing />
                </div>                            
                <button 
                    onClick={() => openSidebar()}
                className="btn-floating-action primary sort-filter">
                    <i className="fa fa-filter"></i>
                </button>                
        </ProductsProvider>
    )
}

export default Products;