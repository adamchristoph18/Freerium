import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAnswerThunk } from "../../store/answers";
import { displayQuestionThunk } from '../../store/questions';
import "./ConfirmDeleteAnswerModalButton.css";

function ConfirmDeleteAnswerModalButton({ answer, questionId }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <h2 className="modal-title are-u-sure-delete">Delete your answer?</h2>
            <div
                className="yes-confirm clickable site-color-b"
                onClick={() => {
                    dispatch(deleteAnswerThunk(answer.id));
                    dispatch(displayQuestionThunk(questionId));
                    closeModal();
                }}
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
