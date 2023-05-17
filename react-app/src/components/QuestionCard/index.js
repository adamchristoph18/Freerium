import { useHistory } from "react-router-dom";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    return (
        <div className="question-card clickable">
            <div className="question-title">
                {question.title}
            </div>
            <div className="question-context">
                {question.context}
            </div>
            <div>
                <img
                    className="question-image"
                    src={question.image_url} alt="" />
            </div>
        </div>
    )
}

export default QuestionCard;
