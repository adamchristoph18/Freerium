import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestionThunk } from "../../store/questions";
import { getQuestionsForSpaceThunk } from "../../store/spaces";
import PuffLoader from "react-spinners/PuffLoader";
import "./ConfirmDeleteModalButton.css";

function ConfirmDeleteModalButton({ question }) {
	const [loading, setLoading] = useState(false);

    const { closeModal } = useModal();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const override = {
        display: "absolute",
        margin: "0 auto",
        borderColor: "red",
        bottom: "150px",
        left: "80px"
    };

    const deleteQuestion = async (e) => {
        setLoading(true);
        await dispatch(deleteQuestionThunk(question.id));
        if (location.pathname.split('/')[3] === 'all-questions') {
                await dispatch(getQuestionsForSpaceThunk(location.pathname.split('/')[2]))
            }

        if (location.pathname !== '/profile') {
                history.push('/');
            }
        closeModal();
    };

    return (
        <>
            <h2 className="modal-title are-u-sure-delete">Delete your question titled "{question.title}"?</h2>
            <div
                className="yes-confirm clickable site-color-b"
                onClick={deleteQuestion}
            >
                Yes please!
            </div>
            <div className="no-forget-it clickable site-color-b" onClick={closeModal}>
                No, thanks
            </div>
            <PuffLoader
                loading={loading}
                color="#36d7b7"
                cssOverride={override}
                size={150}
                />
        </>
    )
}

export default ConfirmDeleteModalButton;
