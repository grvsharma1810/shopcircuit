import './products.css'
import ProductListing from "./components/product-list/ProductList"
import Sidebar from "./components/sidebar/Sidebar";
import { ProductsProvider } from './ProductsProvider';
import { useEffect, useRef } from 'react';
import { useData } from '../../Providers/DataProvider'
import { SET_PRODUCTS } from '../../Providers/data-reducer'
import Spinner from '../shared-components/spinner/Spinner';
import { useAxios } from '../../Providers/AxiosProvider'

const Products = () => {

    const { dataState, dataDispatch } = useData();
    const { getData: getProductsData, isLoading } = useAxios('/api/product');

    useEffect(() => {
        if (dataState.products.length === 0) {
            (async function () {
                const products = await getProductsData();
                console.log({ products });
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
                <div>
                    <Sidebar
                        closeSidebar={closeSidebar}
                        ref={sidebarRef} />
                    <div className="products">
                        <ProductListing
                            openSidebar={openSidebar} />
                    </div>
                </div>
            }
        </ProductsProvider>
    )
}

export default Products;