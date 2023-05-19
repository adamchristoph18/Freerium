

import "./AnswerCard.css";


function AnswerCard({ answer }) {
    const author = answer.user;

    return (
        <div className="answer-card-container">
            <div className="answer-author site-color">
                Answer published by {author.first_name}
            </div>
            <div className="main-answer-text">
                {answer.body}
            </div>
        </div>
    )
}

export default AnswerCard;
