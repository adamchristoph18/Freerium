import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteAnswerThunk } from "../../store/answers";
import { displayQuestionThunk } from '../../store/questions';
import PuffLoader from "react-spinners/PuffLoader";
import "./ConfirmDeleteAnswerModalButton.css";

function ConfirmDeleteAnswerModalButton({ answer, questionId }) {
	const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const override = {
        display: "absolute",
        margin: "0 auto",
        borderColor: "red",
        bottom: "150px",
        left: "80px"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await dispatch(deleteAnswerThunk(answer.id));
        await dispatch(displayQuestionThunk(questionId));
        closeModal();
    };

    return (
        <>
            <h2 className="modal-title are-u-sure-delete">Delete your answer?</h2>
            <div
                className="yes-confirm clickable site-color-b"
                onClick={handleSubmit}
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

export default ConfirmDeleteAnswerModalButton;
