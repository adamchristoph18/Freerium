import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import { getAllAnswersThunk } from "../../store/answers";
import QuestionCard from "../QuestionCard";
import AnswerCard from "../AnswerCard";
import NothingToShow from "../NothingToShow";

import "./UserProfilePage.css";

function UserProfilePage({ user }) {
    const [showQuestions, setShowQuestions] = useState(true);
    const [showAnswers, setShowAnswers] = useState(false);
    // const [showSpaces, setShowSpaces] = useState(false);

    const history = useHistory();

    const questionsObject = useSelector(state => state.questions.allQuestions);
    const answersObject = useSelector(state => state.answers.allAnswers);

    const myQuestions = Object.values(questionsObject).reverse()
                .filter(question => question.user.id === user.id);

    const myAnswers = Object.values(answersObject).reverse()
                .filter(answer => answer.user.id === user.id);

    const dispatch = useDispatch();

    // const toggleClassName = (showQuestions ? " white-cloud" : "")

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
        dispatch(getAllAnswersThunk());
    }, [dispatch, myQuestions.length, myAnswers.length]);

    const myQuestionsClick = (e) => {
        e.preventDefault();
        setShowQuestions(true);
        setShowAnswers(false);
        return;
    };

    const myAnswersClick = (e) => {
        e.preventDefault();
        setShowQuestions(false);
        setShowAnswers(true);
        return;
    };

    return (
        <div className="user-profile-page">
            <div className="user-profile-top">
                <img className="user-img-profile-page" src={user.profile_image_url} alt="" />
                <div className="user-info-card">
                    <h3 className="your">Your...</h3>
                    <p className="user-detail">Name: {user.first_name} {user.last_name}</p>
                    <p className="user-detail">Username: {user.username}</p>
                    <p className="user-detail">Account was last updated: {user.created_at}</p>
                    <p className="user-detail">Number of questions: {myQuestions.length}</p>
                    <p className="user-detail">Number of answers: {myAnswers.length}</p>
                </div>
            </div>
            <div className="toggle-divs">
                <div className="your-toggle-option toggle-left clickable" onClick={myQuestionsClick}>
                    Your Questions</div>
                <div className="your-toggle-option clickable" onClick={myAnswersClick}>
                    Your Answers</div>
            </div>
            <div className="questions-answers-container">
                {showQuestions ? (
                    myQuestions.length > 0 ? (
                        myQuestions.map(q => (
                            <QuestionCard question={q} key={q.id} />
                        ))
                    ) : ( <NothingToShow /> )
                ) : (
                    myAnswers.length > 0 ? (
                        myAnswers.map(a => (
                            <AnswerCard answer={a} questionId={a.question.id} key={a.id} />
                        ))
                    ) : ( <NothingToShow /> )
                )}
            </div>
        </div>
    )
}

export default UserProfilePage;
