import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import OpenConfirmDeleteModalButton from "../OpenConfirmDeleteModalButton";
import OpenUpdateQuestionModalButton from "../OpenUpdateQuestionModalButton";
import ConfirmDeleteModalButton from "../ConfirmDeleteModalButton";
import QuestionFormModal from "../QuestionFormModal";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
    const author = question.user;

    const userWroteQuestion = () => author.id === sessionUser?.id;

    return (
        <div className="question-card clickable" onClick={(e) => history.push(`/questions/${question.id}`)}>
            <div className="question-top-line">
                <div className="question-title">
                    {question.title}
                </div>
                <span className="question-author site-color">
                    Posted by {userWroteQuestion() ? "you" : author.first_name} @ {question.created_at > question.updated_at ? question.created_at : question.updated_at}
                </span>
            </div>
            <div className="question-context">
                {question.context}
            </div>
            <div>
                <img
                    className="question-image"
                    src={question.image_url} alt="" />
            </div>
            {/* <div>
                Answer
                Upvotes {question.upvotes}
                Downvotes {question.downvotes}
            </div> */}
            {userWroteQuestion() && (
                <div>
                    <OpenConfirmDeleteModalButton
                        buttonText="Delete"
                        modalComponent={
                            <ConfirmDeleteModalButton question={question} />
                        }
                    />

                    <OpenUpdateQuestionModalButton
                        buttonText="Update"
                        modalComponent={
                            <QuestionFormModal type='update' title='Update this question' question={question} />
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default QuestionCard;
