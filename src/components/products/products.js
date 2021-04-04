import './products.css'
import ProductListing from "./product-list/product-list"
import Sidebar from "./sidebar/sidebar";
import { ProductsProvider } from './products-context';
import { useEffect, useRef } from 'react';
import { useData } from '../../data-context'
import { SET_PRODUCTS } from '../../data-reducer'
import Spinner from '../shared-components/spinner';
import { useAxios } from '../../useAxios'

const Products = () => {

    const { dataState, dataDispatch } = useData();
    const { getData: getProductsData, isLoading } = useAxios('/api/product');

    useEffect(() => {
        if (dataState.products.length === 0) {
            (async function () {
                const products = await getProductsData();
                dataDispatch({ type: SET_PRODUCTS, payload: { products } })
            })()
        }
    }, [])

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
            { isLoading && <Spinner />}
            {
                !isLoading &&
                <>
                    <Sidebar
                        closeSidebar={closeSidebar}
                        ref={sidebarRef} />
                    <div className="products">
                        <ProductListing
                            openSidebar={openSidebar} />
                    </div>
                </>
            }
        </ProductsProvider>
    )
}

export default Products;