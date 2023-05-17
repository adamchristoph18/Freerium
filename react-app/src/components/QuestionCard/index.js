import { useHistory } from "react-router-dom";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    return (
        <>
            {question.context}
        </>
    )
}

export default QuestionCard;
