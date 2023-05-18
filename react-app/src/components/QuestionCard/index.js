import { useHistory } from "react-router-dom";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    const author = question.user;

    return (
        <div className="question-card clickable">
            <div className="question-top-line">
                <div className="question-title">
                    {question.title}
                </div>
                <span className="question-author site-color">
                    Posted by {author.first_name}
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
            <div>
                Answer
                Upvotes {question.upvotes}
                Downvotes {question.downvotes}
            </div>
        </div>
    )
}

export default QuestionCard;
