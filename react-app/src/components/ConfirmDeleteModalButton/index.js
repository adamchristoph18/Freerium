import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestionThunk } from "../../store/questions";
import "./ConfirmDeleteModalButton.css";

function ConfirmDeleteModalButton({ question }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <h2 className="modal-title are-u-sure-delete">Delete your question titled "{question.title}"?</h2>
            <div
                className="yes-confirm clickable site-color-b"
                onClick={() => {
                    dispatch(deleteQuestionThunk(question.id));
                    history.push('/');
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

export default ConfirmDeleteModalButton;
