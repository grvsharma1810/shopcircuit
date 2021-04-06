import './wishlist.css'
import { useEffect } from 'react'
import { useAxios } from '../../useAxios'
import { useData } from '../../data-context'
import { WishlistCard } from './components/wishlist-card/wishlist-card';
import { SET_WISHLIST } from '../../data-reducer';
import Spinner from '../shared-components/spinner/spinner';

const Wishlist = () => {

    const { dataState, dataDispatch } = useData();
    const { getData: getWishlistData, isLoading } = useAxios('/api/wishlist');

    useEffect(() => {
        if (dataState.wishlist.length === 0) {
            (async function () {
                const wishlist = await getWishlistData();
                dataDispatch({ type: SET_WISHLIST, payload: { wishlist } })
            })()
        }
    }, [])

    const wishlist = dataState.wishlist ? dataState.wishlist : [];

    return (
        <>
            {isLoading && <Spinner />}
            {
                !isLoading &&
                <div className="wishlist-container">
                    {
                        wishlist.length !== 0 &&
                        <div>
                            <h4 className="text-size-2 text-heading-medium mb-1">WISHLIST</h4>
                            <div className="flex flex-row">
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
            }
        </>
    )
}

export default Wishlist;