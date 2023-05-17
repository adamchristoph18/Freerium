// Action type constants
const GET_ALL_QUESTIONS = "questions/GET_ALL_QUESTIONS";

// Action creators
const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions
});

// Thunk Action Creators
export const getAllQuestionsThunk = () => async (dispatch) => {
    const response = await fetch("/api/questions/all");

    if (response.ok) {
        const { questions } = await response.json();
        dispatch(getAllQuestions(questions));

        return questions;
    }

    const errors = await response.json();
    return errors;
}

// Questions reducer

const initialState = { allQuestions: {} };

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_QUESTIONS: {
            const newState = {...state, allQuestions: {...state.allQuestions}};
            action.questions.forEach(question => {
                newState.allQuestions[question.id] = question;
            });
            return newState;
        }
        default:
            return state;
    }
};


export default questionsReducer;
