import { createContext, useContext, useReducer } from 'react'
import { dataReducer } from './data-reducer'
import { productsData } from './products-data'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, {
        products: [],
        cart: [],
        wishlist: []
    })
    return (
        <DataContext.Provider value={{ dataState: state, dataDispatch: dispatch }}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => {
    return useContext(DataContext);
}