import { useHistory } from "react-router-dom";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    return (
        <div className="question-card">
            <div>
                {question.title}
            </div>
            <div>
                {question.context}
            </div>
        </div>
    )
}

export default QuestionCard;
