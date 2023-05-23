import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import { getAllAnswersThunk } from "../../store/answers";

import "./UserProfilePage.css";

function UserProfilePage({ user }) {
    const questionsObject = useSelector(state => state.questions.allQuestions);
    const answersObject = useSelector(state => state.answers.allAnswers);

    const myQuestions = Object.values(questionsObject).reverse()
                .filter(question => question.user.id === user.id);

    const myAnswers = Object.values(answersObject).reverse()
                .filter(answer => answer.user.id === user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
        dispatch(getAllAnswersThunk());
    }, [dispatch, myQuestions.length, myAnswers.length]);

    return (
        <div>
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
        </div>
    )
}

export default UserProfilePage;
