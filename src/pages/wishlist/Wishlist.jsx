import './wishlist.css'
import { useEffect } from 'react'
import { useAxios } from '../../providers/AxiosProvider'
import { useData } from '../../providers/DataProvider'
import { WishlistCard } from './components/wishlist-card/WishlistCard';
import { SET_WISHLIST } from '../../providers/data-reducer';
import Spinner from '../shared-components/spinner/Spinner';

const Wishlist = () => {    

    return (
        <>
            Wishlist
        </>
    )
}

export default Wishlist;