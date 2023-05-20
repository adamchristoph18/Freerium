import { useSelector } from 'react-redux';
import OpenConfirmDeleteModalButton from '../OpenConfirmDeleteModalButton';
import OpenUpdateAnswerModalButton from '../OpenUpdateAnswerButton';
import AnswerFormModal from '../AnswerFormModal';
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
                @ {answer.created_at > answer.updated_at ? answer.created_at : answer.updated_at}
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

                    <OpenUpdateAnswerModalButton
                        buttonText="Update"
                        modalComponent={
                            <AnswerFormModal type='update' title='Update this answer' answer={answer} questionId={questionId} />
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default AnswerCard;
