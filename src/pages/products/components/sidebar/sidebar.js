import React from 'react';
import './sidebar.css'
import { useProducts } from '../../products-context'
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
            <div className="form-row">
                <p className="form-check mb-1">
                    <input
                        type="radio"
                        id="highToLow"
                        name="sort"
                        value={HIGH_TO_LOW}
                        checked={productsState[SORT_BY_PRICE] && productsState[SORT_BY_PRICE] === HIGH_TO_LOW}
                        onChange={() => productsDispatch({ type: SORT_BY_PRICE, payload: { value: HIGH_TO_LOW } })}
                    />
                    <label htmlFor="highToLow"> Price - High to Low</label>
                </p>
                <p className="form-check">
                    <input
                        type="radio"
                        id="lowToHigh"
                        name="sort"
                        value={LOW_TO_HIGH}
                        checked={productsState[SORT_BY_PRICE] && productsState[SORT_BY_PRICE] === LOW_TO_HIGH}
                        onChange={() => productsDispatch({ type: SORT_BY_PRICE, payload: { value: LOW_TO_HIGH } })}
                    />
                    <label htmlFor="lowToHigh"> Price - Low to High</label>
                </p>
            </div>
            <h5 className="text-size-2 mb-1 mt-1">Fliters</h5>
            <div className="form-row">
                <p className="form-check mb-1">
                    <input
                        type="checkbox"
                        id="outofstock"
                        name="filter"
                        value="filterByOutOfStock"
                        checked={productsState[INCLUDE_OUT_OF_STOCK]}
                        onChange={() => productsDispatch({ type: INCLUDE_OUT_OF_STOCK, payload: { value: {} } })}
                    />
                    <label htmlFor="outofstock"> Include Out Of Stock</label>
                </p>
                <p className="form-check">
                    <input
                        type="checkbox"
                        id="fastdeliveryonly"
                        name="filter"
                        value="filterByFastDeliveryOnly"
                        checked={productsState[ONLY_FAST_DELIVERY]}
                        onChange={() => productsDispatch({ type: ONLY_FAST_DELIVERY, payload: { value: {} } })}
                    />
                    <label htmlFor="fastdeliveryonly"> Fast Delivery Only</label>
                </p>
            </div>
            <button
                className="btn-solid secondary"
                onClick={() => productsDispatch({ type: CLEAR_FILTERS, payload: { value: {} } })}
            >Clear Filters</button>
            <button
                onClick={() => closeSidebar()}
                className="btn-solid secondary sidebar-close">X</button>
        </div>
    )
}

const forwardedRefSidebar = React.forwardRef(Sidebar);

export default forwardedRefSidebar;