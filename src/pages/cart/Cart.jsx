import { useEffect } from 'react'
import { useData } from '../../providers/DataProvider'
import { useAxios } from '../../providers/AxiosProvider'
import './cart.css'
import { CartCard } from './components/cart-card/CartCard'
import { CartPrice } from './components/cart-price/CartPrice';
import { SET_CART } from '../../providers/data-reducer'
import Spinner from '../shared-components/spinner/Spinner';

const Cart = () => {            

    return (
        <div>
            Cart
        </div>
    )
}

export default Cart;