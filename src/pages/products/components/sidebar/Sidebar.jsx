import React from 'react';
import './sidebar.css'
import { useProducts } from '../../ProductsProvider'
import {
    SORT_BY_PRICE,
    INCLUDE_OUT_OF_STOCK,
    ONLY_FAST_DELIVERY,
    HIGH_TO_LOW,
    LOW_TO_HIGH,
    CLEAR_FILTERS
} from '../../product-reducer'

const Sidebar = ({ closeSidebar }, ref) => {

    const { productsState, productsDispatch } = useProducts();

    return (
        <div className="sidebar" ref={ref}>
            <h5 className="text-size-2 mb-1">Sort By</h5>            
            <button
                onClick={() => closeSidebar()}
                className="btn-solid secondary sidebar-close">X</button>
        </div>
    )
}

const forwardedRefSidebar = React.forwardRef(Sidebar);

export default forwardedRefSidebar;