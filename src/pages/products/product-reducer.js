export const SORT_BY_PRICE = 'sortByPrice';
export const INCLUDE_OUT_OF_STOCK = 'includeOutOfStock'
export const ONLY_FAST_DELIVERY = 'onlyFastDelivery'
export const HIGH_TO_LOW = 'highToLow';
export const LOW_TO_HIGH = 'lowToHigh';
export const CLEAR_FILTERS = 'clearFilters'
export const SEARCH_INPUT = 'searchInput'

export const productsReducer = (state, action) => {
    console.log({ state, action })
    switch (action.type) {
        case SORT_BY_PRICE:
            return { ...state, [SORT_BY_PRICE]: action.payload.value }

        case INCLUDE_OUT_OF_STOCK:
            return { ...state, [INCLUDE_OUT_OF_STOCK]: !state[INCLUDE_OUT_OF_STOCK] }

        case ONLY_FAST_DELIVERY:
            return { ...state, [ONLY_FAST_DELIVERY]: !state[ONLY_FAST_DELIVERY] }

        case SEARCH_INPUT:
            return { ...state, [SEARCH_INPUT]: action.payload.value }

        case CLEAR_FILTERS:
            return {
                ...state,
                [ONLY_FAST_DELIVERY]: false,
                [INCLUDE_OUT_OF_STOCK]: false
            }

        default:
            return state;
    }
}