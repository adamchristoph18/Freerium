import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteAnswerThunk } from "../../store/answers";
import { displayQuestionThunk } from '../../store/questions';
import "./ConfirmDeleteAnswerModalButton.css";

function ConfirmDeleteAnswerModalButton({ answer, questionId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteAnswerThunk(answer.id));
        await dispatch(displayQuestionThunk(questionId));
        closeModal();
    }

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
        </>
    )
}

export default ConfirmDeleteAnswerModalButton;
