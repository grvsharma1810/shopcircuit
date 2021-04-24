import './products.css'
import ProductListing from "./components/product-list/ProductList"
import Sidebar from "./components/sidebar/Sidebar";
import { ProductsProvider } from './ProductsProvider';
import { useEffect, useRef } from 'react';
import { useData } from '../../providers/DataProvider'
import { SET_PRODUCTS } from '../../providers/data-reducer'
import Spinner from '../shared-components/spinner/Spinner';
import { useAxios } from '../../providers/AxiosProvider'

const Products = () => {        

    return (
        <ProductsProvider>
            Products
        </ProductsProvider>
    )
}

export default Products;