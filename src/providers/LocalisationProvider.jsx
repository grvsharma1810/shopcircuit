import { useState, useContext, useReducer, createContext } from "react";
import { localisationReducer } from "../reducers/localisation-reducer";

const LocalisationContext = createContext({});

export const LocalisationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(localisationReducer, {
        language: "English",
    });

    return (
        <LocalisationContext.Provider
            value={{ localisationState: state, localisationDispatch: dispatch }}
        >
            {children}
        </LocalisationContext.Provider>
    );
};

export const useLocalisation = () => {
    return useContext(LocalisationContext);
};
