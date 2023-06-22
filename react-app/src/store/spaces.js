// Action type constants
const GET_ALL_SPACES = "spaces/GET_ALL_SPACES";

// Action creators
const getAllSpaces = (spaces) => ({
    type: GET_ALL_SPACES,
    spaces
});

// Thunk action creators
export const getAllSpacesThunk = () => async (dispatch) => {
    const response = await fetch("/api/spaces/all");

    if (response.ok) {
        const { spaces } = await response.json();
        dispatch(getAllSpaces(spaces));

        return spaces;
    }
}

// Spaces reducer
const initialState = { allSpaces: {} };

const spacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPACES: {
            const newState = {...state, allSpaces: {...state.allSpaces}};
            action.spaces.forEach(space => {
                newState.allSpaces[space.id] = space;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default spacesReducer;
