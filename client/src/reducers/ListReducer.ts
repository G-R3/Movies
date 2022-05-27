enum ListActionKind {
    LOAD = "LOAD_LIST",
    SET = "SET_LIST",
    ADD = "ADD_LIST",
    EDIT = "EDIT_LIST",
    REMOVE = "REMOVE_LIST",
    CLEAR = "CLEAR_LIST",
}

interface List {
    _id: string;
    title: string;
    description: string;
}
interface State {
    lists: List[];
    isLoading: boolean;
}

interface ListAction {
    type: string;
    payload?: any;
}

const reducer = (state: State, action: ListAction): State => {
    switch (action.type) {
        case ListActionKind.LOAD: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case ListActionKind.SET: {
            return {
                ...state,
                lists: [...action.payload],
                isLoading: false,
            };
        }
        case ListActionKind.ADD: {
            return {
                ...state,
                lists: [...state.lists, { ...action.payload }],
            };
        }
        case ListActionKind.EDIT: {
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list._id === action.payload._id) {
                        return {
                            ...list,
                            title: action.payload.title,
                            description: action.payload.description,
                        };
                    }
                    return list;
                }),
            };
        }
        case ListActionKind.CLEAR: {
            return {
                ...state,
                lists: [],
            };
        }
        case ListActionKind.REMOVE: {
            return {
                isLoading: false,
                lists: state.lists.filter(
                    (list) => list._id !== action.payload._id
                ),
            };
        }
        default:
            return state;
    }
};

export default reducer;
