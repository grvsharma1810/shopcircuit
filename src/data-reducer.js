export const ADD_TO_CART = 'addToCart';
export const ADD_TO_WISHLIST = 'addToWishList';
export const REMOVE_FROM_WISHLIST = 'removeFromWishList'
export const INCREASE_QUANTITY_IN_CART = 'increaseQuantityInCart'
export const DECREASE_QUANTITY_IN_CART = 'decreaseQuantityInCart'
export const REMOVE_FROM_CART = 'removeFromCart'
export const SET_PRODUCTS = 'setProducts'


export const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products : payload.products
            }

        case ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(payload.product)
            }

        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.concat(payload.product)
            }

        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== payload.product.id)
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== payload.product.id)
            }

        case INCREASE_QUANTITY_IN_CART:
            return {
                ...state,
                cart: state.cart.map(item => item.id === payload.product.id ? { ...item, qty: item.qty + 1 } : item)
            }

        case DECREASE_QUANTITY_IN_CART:
            return {
                ...state,
                cart: state.cart.map(item => item.id === payload.product.id ? { ...item, qty: item.qty - 1 } : item)
            }

        default:
            return state;
    }
}