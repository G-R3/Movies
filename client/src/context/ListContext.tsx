import { createContext, ReactElement, useEffect, useReducer } from "react";
import listsReducer from "../reducers/ListReducer";

interface Props {
    children: ReactElement;
}

const initialState = {
    lists: [],
};

export const ListContext = createContext<any>(initialState);

export const ListProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(listsReducer, initialState);

    return (
        <ListContext.Provider value={{ lists: state.lists, dispatch }}>
            {children}
        </ListContext.Provider>
    );
};
