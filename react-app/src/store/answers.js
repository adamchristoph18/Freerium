// Action type constants
const ADD_ANSWER = "answers/ADD_ANSWER";

// Action creators
const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
});

// Thunk Action Creators
export const addNewAnswerThunk = (answer) => async (dispatch) => {
    const response = await fetch('/api/answers/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answer)
    });

    if (response.ok) {
        const { answer } = await response.json();
        dispatch(addAnswer(answer));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};


// Answers reducer
const initialState = { singleAnswer: null };

const answersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ANSWER: {
            const newState = {...state, singleAnswer: {...state.singleAnswer}};
            newState.singleAnswer = action.answer;
            return newState;
        }
        default:
            return state;
    }
};


export default answersReducer;
