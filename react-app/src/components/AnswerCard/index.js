import { useSelector } from 'react-redux';
import OpenConfirmDeleteModalButton from '../OpenConfirmDeleteModalButton';
import ConfirmDeleteAnswerModalButton from '../ConfirmDeleteAnswerModalButton';
import "./AnswerCard.css";


function AnswerCard({ answer, questionId }) {
	const sessionUser = useSelector(state => state.session.user);
    const author = answer.user;

    const userWroteAnswer = () => author.id === sessionUser?.id;

    return (
        <div className="answer-card-container">
            <div className="answer-author">
                Answer published by {userWroteAnswer() ? "you" : author.first_name}
            </div>
            <div className="answer-time site-color">
                @ {answer.created_at}
            </div>
            <div className="main-answer-text">
                {answer.body}
            </div>
            {userWroteAnswer() && (
                <div className="author-options">
                    <OpenConfirmDeleteModalButton
                        buttonText="Delete"
                        modalComponent={
                            <ConfirmDeleteAnswerModalButton answer={answer} questionId={questionId} />
                        }
                    />

                    {/* <OpenUpdateQuestionModalButton
                        buttonText="Update"
                        modalComponent={
                            <QuestionFormModal type='update' title='Update this question' question={question} />
                        }
                    /> */}
                </div>
            )}
        </div>
    )
}

export default AnswerCard;
