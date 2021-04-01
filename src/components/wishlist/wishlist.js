import './wishlist.css'
import { useData } from '../../data-context'
import { WishlistCard } from './wishlist-card';

const Wishlist = () => {
    const { dataState } = useData();
    const wishlist = dataState.wishlist;
    console.log({ wishlist });
    return (
        <div className="wishlist-container">
            {
                wishlist.length !== 0 &&
                <div>
                    <h4 className="text-size-2 text-heading-medium">WISHLIST</h4>
                    <div className="flex flex-row flex-gap-2 p-1 h-center">
                        {
                            wishlist.map((product) => {
                                return (
                                    <WishlistCard product={product} key={product.id} />                                    
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                wishlist.length === 0 &&
                <div className="flex h-center p-1">
                    <p className="text-heading-medium text-size-3">
                        Wishlist Is Empty.
                </p>
                </div>
            }
        </div>
    )
}

export default Wishlist;