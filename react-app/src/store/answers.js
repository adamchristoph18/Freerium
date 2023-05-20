// Action type constants
const GET_ALL_ANSWERS = "answers/GET_ALL_ANSWERS";
const ADD_ANSWER = "answers/ADD_ANSWER";
const UPDATE_QUESTION = "answers/UPDATE_ANSWER";
const DELETE_ANSWER = "answers/DELETE_ANSWER";

// Action creators
const getAllAnswers = (answers) => ({
    type: GET_ALL_ANSWERS,
    answers
});

const addAnswer = (answer) => ({
    type: ADD_ANSWER,
    answer
});

const updateAnswer = (answer) => ({
    type: UPDATE_QUESTION,
    answer
});

const deleteAnswer = (answerId) => ({
    type: DELETE_ANSWER,
    answerId
});

// Thunk Action Creators
export const getAllAnswersThunk = () => async (dispatch) => {
    const response = await fetch('/api/answers/all');

    if (response.ok) {
        const { answers } = await response.json();
        dispatch(getAllAnswers(answers));
        return answers;
    }
    const errors = await response.json();
    return errors;
}

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

export const updateAnswerThunk = (answer) => async (dispatch) => {
    const { id, body } = answer;
    const response = await fetch(`/api/answers/${id}/update`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ body })
    });

    if (response.ok) {
        const { answer } = await response.json();
        dispatch(updateAnswer(answer));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
}

export const deleteAnswerThunk = (answerId) => async (dispatch) => {
    const response = await fetch(`/api/answers/${answerId}/delete`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteAnswer(answerId));
    }
};


// Answers reducer
const initialState = { allAnswers: {} };

const answersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ANSWERS: {
            const newState = {...state, allAnswers: {...state.allAnswers}};
            action.answers.forEach(answer => {
                newState.allAnswers[answer.id] = answer;
            });
            return newState;
        }
        case ADD_ANSWER: {
            const newState = {...state, allAnswers: {...state.allAnswers}};
            newState.allAnswers[action.answer.id] = action.answer;
            return newState;
        }
        case UPDATE_QUESTION: {
            const newState = {...state, allAnswers: {...state.allAnswers}};
            newState.allAnswers[action.answer.id] = action.answer;
            return newState;
        }
        case DELETE_ANSWER: {
            const newState = {...state, allAnswers: {...state.allAnswers}};
            delete newState.allAnswers[action.answerId];
            return newState;
        }
        default:
            return state;
    }
};


export default answersReducer;
