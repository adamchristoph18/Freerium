// Action type constants
const GET_ALL_QUESTIONS = "questions/GET_ALL_QUESTIONS";
const ADD_QUESTION = "questions/ADD_QUESTION";
const DELETE_QUESTION = "questions/DELETE_QUESTION";
const UPDATE_QUESTION = "questions/UPDATE_QUESTION";
const DISPLAY_QUESTION = "questions/DISPLAY_QUESTION";
const UPVOTE_QUESTION = "questions/UPVOTE_QUESTION";

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

const getSingleQuestion = (question) => ({
    type: DISPLAY_QUESTION,
    question
});

const upvoteQuestion = (question) => ({
    type: UPVOTE_QUESTION,
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

export const addNewQuestionThunk = (formDataNew) => async (dispatch) => {
    const response = await fetch('/api/questions/new', {
        method: 'POST',
        body: formDataNew
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

export const updateQuestionThunk = (payload) => async (dispatch) => {
    const { id, formDataUpdate } = payload;
    const response = await fetch(`/api/questions/${id}/update`, {
        method: 'PUT',
        body: formDataUpdate
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

export const displayQuestionThunk = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}`);
    if (response.ok) {
        const { question } = await response.json();
        dispatch(getSingleQuestion(question));
        return question;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

export const deleteQuestionThunk = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteQuestion(questionId));
    }
};

export const upvoteQuestionThunk = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}/up`, {
        method: 'PUT',
        body: questionId
    });

    if (response.ok) {
        const { question } = await response.json();
        await dispatch(upvoteQuestion(question));
        return null;
    } else {
        const errorResponse = await response.json();
        return errorResponse.errors;
    }
};

// Questions reducer

const initialState = { allQuestions: {}, singleQuestion: null };

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
            const newState = {...state, allQuestions: {...state.allQuestions}, singleQuestion: {...state.singleQuestion}};
            delete newState.allQuestions[action.questionId];
            newState.singleQuestion = null;
            return newState;
        }
        case UPDATE_QUESTION: {
            const newState = {...state, allQuestions: {...state.allQuestions}};
            newState.allQuestions[action.question.id] = action.question;
            newState.singleQuestion = action.question;
            return newState;
        }
        case DISPLAY_QUESTION: {
            const newState = {...state, singleQuestion: {...state.singleQuestion}};
            newState.singleQuestion = action.question;
            return newState;
        }
        case UPVOTE_QUESTION: {
            const newState = {...state, singleQuestion: {...state.singleQuestion}};
            newState.singleQuestion = action.question;
            return newState;
        }
        default:
            return state;
    }
};


export default questionsReducer;
