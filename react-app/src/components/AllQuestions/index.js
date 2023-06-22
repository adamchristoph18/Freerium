import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import { getAllAnswersThunk } from "../../store/answers";
import QuestionCard from "../QuestionCard";
import LoadingPage from "../LoadingPage";
import SpacesContainer from "../SpacesContainer";
import "./AllQuestions.css";


function AllQuestions() {
    const questionsObject = useSelector(state => state.questions.allQuestions);
    const questions = Object.values(questionsObject).reverse();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
        dispatch(getAllAnswersThunk());
    }, [dispatch, questions.length]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (!questions.length) return <LoadingPage />

    return (
        <div className="home-page">
            <SpacesContainer />
            <div className="all-questions-div">
                {questions.map(question => (
                    <QuestionCard question={question} key={question.id} />
                ))}
            </div>
        </div>
    )
}

export default AllQuestions;
