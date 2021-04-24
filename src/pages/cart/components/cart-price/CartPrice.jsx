import { useData } from '../../../../Providers/DataProvider'

const calculateCartTotal = (cart) => {
    return cart.reduce((acc, curr) => {
        return acc + parseInt(curr.price) * parseInt(curr.qty)
    }, 0)
}

export const CartPrice = () => {

    const { dataState } = useData();
    const cart = dataState.cart;

    return (
        <div className="flex flex-column">
            <div className="text-size-2 mt-1 flex space-btw">
                <span>Grand Total</span>
                <span>Rs. {calculateCartTotal(cart)}</span>
            </div>
            <button className="btn-solid primary mt-1">
                Proceed To Checkout <span className='text-size-sm'>(Coming Soon)</span>
            </button>
        </div>
    )
}