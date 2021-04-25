import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { useAxios } from './AxiosProvider';
import { dataReducer, SET_PRODUCTS } from './data-reducer'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [isInitialAppDataLoading, setIsInitialAppDataLoading] = useState(true);
    const { getData } = useAxios()

    const [state, dispatch] = useReducer(dataReducer, {
        products: [],
        cart: [],
        wishlist: []
    })    

    useEffect(() => {
        (async function () {
            const { products } = await getData(`/products`);
            console.log(products);
            dispatch({ type: SET_PRODUCTS, payload: { products } })
            setIsInitialAppDataLoading(false);
        })()
        // eslint-disable-next-line
    }, [])

    return (
        <DataContext.Provider value={{
            dataState: state,
            dataDispatch: dispatch,
            isInitialAppDataLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => {
    return useContext(DataContext);
}