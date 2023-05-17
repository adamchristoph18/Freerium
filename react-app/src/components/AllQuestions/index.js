import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import QuestionCard from "../QuestionCard";
import "./AllQuestions.css";


function AllQuestions() {
    const questionsObject = useSelector(state => state.questions.allQuestions);
    const questions = Object.values(questionsObject);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch]);

    return (
        <div className="all-questions-div">
            {questions.map(question => (
                <QuestionCard question={question} key={question.id} />
            ))}
        </div>
    )
}

export default AllQuestions;