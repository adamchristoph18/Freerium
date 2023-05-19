import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { displayQuestionThunk } from '../../store/questions';
import QuestionCard from '../QuestionCard';
import "./QuestionShow.css";


function QuestionShow() {
    const { questionId } = useParams();
    const questionObject = useSelector(state => state.questions.singleQuestion);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displayQuestionThunk(questionId));
    }, [dispatch, questionId]);

    if (!questionObject) return null;

    return (
        <div className='question-show-container'>
            <QuestionCard question={questionObject} />
            <p>Hello world</p>
        </div>
    )
}

export default QuestionShow;
