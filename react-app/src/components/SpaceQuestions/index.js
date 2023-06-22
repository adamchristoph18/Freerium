import { getQuestionsForSpaceThunk } from "../../store/spaces";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AllQuestions from "../AllQuestions";
import LoadingPage from "../LoadingPage";

function SpaceQuestions() {
    const { spaceId } = useParams();
    const dispatch = useDispatch();

    const questionsObj = useSelector(state => state.spaces.space);
    const questions = Object.values(questionsObj);

    useEffect(() => {
        dispatch(getQuestionsForSpaceThunk(spaceId));
    }, [dispatch, spaceId]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (!questions.length) return <LoadingPage />

    return (
        <AllQuestions questionsForSpace={questions} />
    )
}

export default SpaceQuestions;
