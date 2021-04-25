export const ADD_TO_CART = 'addToCart';
export const ADD_TO_WISHLIST = 'addToWishlist';
export const REMOVE_FROM_WISHLIST = 'removeFromWishlist'
export const INCREASE_QUANTITY_IN_CART = 'increaseQuantityInCart'
export const DECREASE_QUANTITY_IN_CART = 'decreaseQuantityInCart'
export const REMOVE_FROM_CART = 'removeFromCart'
export const SET_PRODUCTS = 'setProducts'
export const SET_CART = 'setCart'
export const SET_WISHLIST = 'setWishlist'


export const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: payload.products
            }

        case SET_CART:
            return {
                ...state,
                cart: payload.cart
            }

        case SET_WISHLIST:
            return {
                ...state,
                wishlist: payload.wishlist
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
                wishlist: state.wishlist.filter(item => item._id !== payload.product._id)
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== payload.product._id)
            }

        case INCREASE_QUANTITY_IN_CART:
            return {
                ...state,
                cart: state.cart.map(item => item._id === payload.product._id ? { ...item, quantity: item.quantity + 1 } : item)
            }

        case DECREASE_QUANTITY_IN_CART:
            return {
                ...state,
                cart: state.cart.map(item => item._id === payload.product._id ? { ...item, quantity: item.quantity - 1 } : item)
            }

        default:
            return state;
    }
}