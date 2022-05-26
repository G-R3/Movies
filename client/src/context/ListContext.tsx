import { createContext, ReactElement, useEffect, useReducer } from "react";
import listsReducer from "../reducers/ListReducer";

interface Props {
    children: ReactElement;
}

const initialState = {
    lists: [],
    isLoading: true,
};

export const ListContext = createContext<any>(initialState);
export const ListDispatchContext = createContext<any>(null);

export const ListProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(listsReducer, initialState);

    useEffect(() => {
        const getLists = async () => {
            dispatch({ type: "FETCH_LIST" });

            const response = await fetch("/api/lists");
            const data = await response.json();

            dispatch({ type: "SET_LIST", payload: data.lists });
        };

        getLists();
    }, []);

    return (
        <ListContext.Provider value={state}>
            <ListDispatchContext.Provider value={dispatch}>
                {children}
            </ListDispatchContext.Provider>
        </ListContext.Provider>
    );
};
