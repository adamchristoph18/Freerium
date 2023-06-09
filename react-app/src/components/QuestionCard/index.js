import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import OpenConfirmDeleteModalButton from "../OpenConfirmDeleteModalButton";
import OpenUpdateQuestionModalButton from "../OpenUpdateQuestionModalButton";
import ConfirmDeleteModalButton from "../ConfirmDeleteModalButton";
import QuestionFormModal from "../QuestionFormModal";
import AnswerFormModal from "../AnswerFormModal";
import OpenCreateAnswerModalButton from "../OpenCreateAnswerModalButton";
import { upvoteQuestionThunk, downvoteQuestionThunk } from "../../store/questions";
import "./QuestionCard.css";
import { useState } from "react";

function QuestionCard({ question, show }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [userTry, setUserTry] = useState(false);

	const sessionUser = useSelector(state => state.session.user);
    const author = question.user;
    const answers = question.answers;

    const userWroteQuestion = () => author.id === sessionUser?.id;

    const upvote = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (userWroteQuestion()) {
            setUserTry(true);
        } else {
            dispatch(upvoteQuestionThunk(question.id));
            setUserTry(false);
        }
        return;
    };

    const downvote = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (userWroteQuestion()) {
            setUserTry(true);
        } else {
            dispatch(downvoteQuestionThunk(question.id));
            setUserTry(false);
        }
        return;
    };

    return (
        <div className="question-card clickable" onClick={(e) => history.push(`/questions/${question.id}`)}>
            <div className="question-top-line">
                <div className="question-title">
                    {question.title}
                </div>
                <span className="question-author site-color">
                    Posted by {userWroteQuestion() ? "you" : author.first_name} @ {question.created_at > question.updated_at ? question.created_at : question.updated_at}
                </span>
                <span className="answers-to-question-line">Answers to this question so far ~ {answers.length}</span>
            </div>
            <div className="question-context">
                {question.context}
            </div>
            <div>
                <img
                    className="question-image"
                    src={question.image_url} alt="" />
            </div>
            {userWroteQuestion() ? (
                <div className="author-options">
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
            ) :
                    <OpenCreateAnswerModalButton
                        buttonText="Add a new Answer"
                        modalComponent={
                            <AnswerFormModal type='create' title='Add a New Answer' question={question} />
                        }
                    />
                    }
            {show && (
                <>
                    <div className="voting">
                        <button className="upvote-downvote clickable" onClick={upvote}>
                            Upvote {question.upvotes}
                        </button>
                        <button className="upvote-downvote clickable" onClick={downvote}>
                            Downvote {question.downvotes}
                        </button>
                        <button className="upvote-downvote-aggregate">
                            Aggregate {question.upvotes + question.downvotes}
                        </button>
                    </div>
                    {userTry && ( <p className="author-cant-vote">*You can't vote on your own question</p> )}
                </>
            )}
        </div>
    )
}

export default QuestionCard;
