import { useSelector } from 'react-redux';
import "./AnswerCard.css";


function AnswerCard({ answer }) {
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
        </div>
    )
}

export default AnswerCard;
