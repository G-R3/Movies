enum ListActionKind {
    SET = "SET_LIST",
    ADD = "ADD_LIST",
}

interface List {
    _id: string;
    title: string;
    description: string;
}
interface State {
    lists: List[];
}

interface ListAction {
    type: string;
    payload?: any;
}

const reducer = (state: State, action: ListAction): State => {
    switch (action.type) {
        case ListActionKind.SET:
            return {
                ...state,
                lists: [...action.payload],
            };
        case ListActionKind.ADD:
            return {
                ...state,
                lists: [...state.lists, { ...action.payload }],
            };
        default:
            return state;
    }
};

export default reducer;
