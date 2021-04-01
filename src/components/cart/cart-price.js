import { useData } from '../../data-context'

const calculateCartTotal = (cart) => {
    return cart.reduce((acc, curr) => {
        return acc + parseInt(curr.price) * parseInt(curr.qty)
    }, 0)
}

export const CartPrice = () => {

    const { dataState } = useData();
    const cart = dataState.cart;

    return (
        <div className="text-size-2 mt-1 flex space-btw">
            <span>Grand Total</span>
            <span>Rs. {calculateCartTotal(cart)}</span>
        </div>
    )
}