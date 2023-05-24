import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { displayQuestionThunk } from '../../store/questions';
import QuestionCard from '../QuestionCard';
import AnswerCard from '../AnswerCard';
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
            <div className='question-show-left'>
                <QuestionCard question={questionObject} show={true} />
            </div>
            <div className='question-show-right'>
                {questionObject.answers.length > 0 ? (
                    questionObject.answers.map(answer => (
                        <AnswerCard answer={answer} key={answer.id} questionId={questionId} />
                    ))
                ) : <span className='no-answers-yet'>Nobody has submitted an answer to this question yet!</span>}
            </div>
        </div>
    )
}

export default QuestionShow;
