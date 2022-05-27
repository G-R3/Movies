import {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useReducer,
} from "react";
import listsReducer from "../reducers/ListReducer";
import { AuthContext } from "./AuthContext";

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
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn) return;
        const getLists = async () => {
            dispatch({ type: "FETCH_LIST" });

            const response = await fetch("/api/lists");
            const data = await response.json();

            dispatch({ type: "SET_LIST", payload: data.lists });
        };

        getLists();
    }, [isLoggedIn]);

    console.log(state);

    return (
        <ListContext.Provider value={state}>
            <ListDispatchContext.Provider value={dispatch}>
                {children}
            </ListDispatchContext.Provider>
        </ListContext.Provider>
    );
};
