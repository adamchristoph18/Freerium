import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/questions";
import { getAllAnswersThunk } from "../../store/answers";
import { getAllSpacesThunk } from "../../store/spaces";
import QuestionCard from "../QuestionCard";
import LoadingPage from "../LoadingPage";
import SpacesContainer from "../SpacesContainer";
import "./AllQuestions.css";


function AllQuestions({ questionsForSpace }) {
    const questionsObject = useSelector(state => state.questions.allQuestions);
    const questions = Object.values(questionsObject).reverse();

    const spacesObject = useSelector(state => state.spaces.allSpaces);
    const spaces = Object.values(spacesObject);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
        dispatch(getAllAnswersThunk());
        dispatch(getAllSpacesThunk());
    }, [dispatch, questions.length, questionsForSpace?.length, spaces.length]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (questionsForSpace && questionsForSpace[0].space_id !== parseInt(location.pathname.split('/')[2])) return <LoadingPage />
    if (!questions.length) return <LoadingPage />

    return (
        <div className="home-page">
            <SpacesContainer spaces={spaces} />
            <div className="all-questions-div">
                {questionsForSpace ? questionsForSpace.map(question => (
                    <QuestionCard question={question} key={question.id} />
                )) : questions.map(question => (
                    <QuestionCard question={question} key={question.id} />
                ))}
            </div>
        </div>
    )
}

export default AllQuestions;
