// Action type constants
const GET_ALL_SPACES = "spaces/GET_ALL_SPACES";
const GET_QUESTIONS_FOR_SPACE = "spaces/GET_QUESTIONS_FOR_SPACE";

// Action creators
const getAllSpaces = (spaces) => ({
    type: GET_ALL_SPACES,
    spaces
});

const getQuestionsForSpace = (questions) => ({
    type: GET_QUESTIONS_FOR_SPACE,
    questions
});

// Thunk action creators
export const getAllSpacesThunk = () => async (dispatch) => {
    const response = await fetch("/api/spaces/all");

    if (response.ok) {
        const { spaces } = await response.json();
        dispatch(getAllSpaces(spaces));

        return spaces;
    }
};

export const getQuestionsForSpaceThunk = (spaceId) => async (dispatch) => {
    const response = await fetch(`/api/spaces/${spaceId}/questions`);

    if (response.ok) {
        const { questions } = await response.json();
        dispatch(getQuestionsForSpace(questions));
        return questions;
    }
};

// Spaces reducer
const initialState = { allSpaces: {}, space: {} };

const spacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPACES: {
            const newState = {...state, allSpaces: {...state.allSpaces}};
            action.spaces.forEach(space => {
                newState.allSpaces[space.id] = space;
            });
            return newState;
        }
        case GET_QUESTIONS_FOR_SPACE: {
            const newState = {...state, space: {}};
            action.questions.forEach(question => {
                newState.space[question.id] = question;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default spacesReducer;
