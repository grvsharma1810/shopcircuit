import ProductCard from '../product-card/ProductCard'
import { useData } from '../../../../providers/DataProvider'
import { useProducts } from '../../ProductsProvider'
import {
    SORT_BY_PRICE,
    ONLY_FAST_DELIVERY,
    INCLUDE_OUT_OF_STOCK,
    HIGH_TO_LOW,
    LOW_TO_HIGH,
    SEARCH_INPUT
} from '../../product-reducer'

const getProductsSortedByPrice = (productsList, type) => {
    if (type && type === HIGH_TO_LOW) {
        return productsList.sort((a, b) => b.price - a.price);
    }
    if (type && type === LOW_TO_HIGH) {
        return productsList.sort((a, b) => a.price - b.price);
    }
    return productsList;
}

const getFilteredProducts = (productsList, showFastDeliveryOnly, includeOutOfStock, searchInput) => {
    if (showFastDeliveryOnly) {
        productsList = productsList.filter((product) => product.fastDelivery === true);
    }
    if (!includeOutOfStock) {
        productsList = productsList.filter((product) => product.inStock === true);
    }
    if (searchInput !== '') {
        productsList = productsList.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()))
    }
    return productsList;
}

const ProductListing = () => {

    const { productsState, productsDispatch } = useProducts();
    const { dataState } = useData();
    const products = dataState.products ? dataState.products : [];
    const sortedProducts = getProductsSortedByPrice(products, productsState[SORT_BY_PRICE]);
    const filteredProducts = getFilteredProducts(
        sortedProducts,
        productsState[ONLY_FAST_DELIVERY],
        productsState[INCLUDE_OUT_OF_STOCK],
        productsState[SEARCH_INPUT]
    )

    return (
        <div>
            <p className="form-field mb-1">
                <label htmlFor="search">Search For Products</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Products"
                    name="searchInput"
                    onChange={(event) => productsDispatch({ type: SEARCH_INPUT, payload: { value: event.target.value } })} />
            </p>            
            <p className="mb-1">Showing {filteredProducts.length} products out of {products.length}</p>
            <div className="flex flex-row">
                {
                    filteredProducts.map((product) => {
                        return (
                            <ProductCard product={product} key={product._id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductListing;