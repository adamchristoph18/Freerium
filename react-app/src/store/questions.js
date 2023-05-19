// Action type constants
const GET_ALL_QUESTIONS = "questions/GET_ALL_QUESTIONS";
const ADD_QUESTION = "questions/ADD_QUESTION";
const DELETE_QUESTION = "questions/DELETE_QUESTION";
const UPDATE_QUESTION = "questions/UPDATE_QUESTION";

// Action creators
const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    questions
});

const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question
});

const deleteQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    questionId
});

const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    question
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
};

export const addNewQuestionThunk = (question) => async (dispatch) => {
    const response = await fetch('/api/questions/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    });

    if (response.ok) {
        const { question } = await response.json();
        dispatch(addQuestion(question));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const updateQuestionThunk = (question) => async (dispatch) => {
    const { id, title, context, imageUrl } = question;
    const response = await fetch(`/api/questions/${id}/update`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, context, imageUrl })
    });

    if (response.ok) {
        const { question } = await response.json();
        dispatch(updateQuestion(question));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
}


export const deleteQuestionThunk = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteQuestion(questionId));
    }
};

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
        case ADD_QUESTION: {
            const newState = {...state, allQuestions: {...state.allQuestions}};
            newState.allQuestions[action.question.id] = action.question;
            return newState;
        }
        case DELETE_QUESTION: {
            const newState = {...state, allQuestions: {...state.allQuestions}};
            delete newState.allQuestions[action.questionId];
            return newState;
        }
        case UPDATE_QUESTION: {
            const newState = {...state, allQuestions: {...state.allQuestions}};
            newState.allQuestions[action.question.id] = action.question;
            return newState;
        }
        default:
            return state;
    }
};


export default questionsReducer;
