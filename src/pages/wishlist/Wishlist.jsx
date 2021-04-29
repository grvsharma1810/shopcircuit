import './wishlist.css'
import { useData } from '../../providers/DataProvider'
import { WishlistCard } from './components/wishlist-card/WishlistCard';

const Wishlist = () => {    

    const { dataState } = useData();    

    const wishlist = dataState.wishlist ? dataState.wishlist : [];

    return (
        <div>                      
            {
                wishlist.length > 0 &&
                <div className="wishlist-container">                    
                        <h4 className="text-size-2 text-heading-medium mb-1">MY wishlist</h4>
                        <div className="flex">
                            {
                                wishlist.map((wishlistItem) => {
                                    return (
                                        <WishlistCard wishlistItem={wishlistItem} key={wishlistItem._id} />
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
                        Your wishlist Is Empty. Please Add Something In wishlist.
                    </p>
                </div>
            }
        </div>
    )
}

export default Wishlist;