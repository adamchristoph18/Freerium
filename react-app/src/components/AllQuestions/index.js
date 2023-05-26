import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import { getAllAnswersThunk } from "../../store/answers";
import QuestionCard from "../QuestionCard";
import LoadingPage from "../LoadingPage";
import "./AllQuestions.css";


function AllQuestions() {
    const questionsObject = useSelector(state => state.questions.allQuestions);
    const questions = Object.values(questionsObject).reverse();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
        dispatch(getAllAnswersThunk());
    }, [dispatch, questions.length]);

    if (!questions.length) return <LoadingPage />

    return (
        <div className="all-questions-div">
            {questions.map(question => (
                <QuestionCard question={question} key={question.id} />
            ))}
        </div>
    )
}

export default AllQuestions;
