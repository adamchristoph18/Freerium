import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteQuestionThunk } from "../../store/questions";
import "./ConfirmDeleteModalButton.css";

function ConfirmDeleteModalButton({ question }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    return (
        <>
            <h2 className="modal-title are-u-sure-delete">Are you sure you want to delete this question?</h2>
            <div
                className="yes-confirm clickable site-color-b"
                onClick={() => {
                    dispatch(deleteQuestionThunk(question.id));
                    closeModal();
                }}
            >
                Yes, I'd like to delete my post I titled "{question.title}"
            </div>
            <div className="no-forget-it clickable site-color-b" onClick={closeModal}>
                No, I'd like to NOT DELETE
            </div>
        </>
    )
}

export default ConfirmDeleteModalButton;
