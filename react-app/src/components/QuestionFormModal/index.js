import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewQuestionThunk } from "../../store/questions";
import ErrorHandler from "../ErrorHandler";
import "./QuestionFormModal.css";

function QuestionFormModal({ type, title }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [questionTitle, setQuestionTitle] = useState("");
    const [context, setContext] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    return (
        <>
            <h2 className="modal-title">{title}</h2>
            <form>
                <label className="modal-input-label">
                    Title
                    <input
                        type="text"
                        placeholder="Title/theme for your question"
                        className="modal-input"
                        name='questionTitle'
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                    />
                </label>
                <label className="modal-input-label">
                    Context
                    <textarea
                        type="text"
                        placeholder="Provide the reasoning and thought to your question here"
                        className="modal-input question-reasoning"
                        name='questionTitle'
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                    />
                </label>
                <label className="modal-input-label">
                    Image URL (Optional)
                    <input
                        type="text"
                        placeholder="Image URL to support your question"
                        className="modal-input"
                        name='questionTitle'
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                    />
                </label>
                <button className="clickable submit-question site-color-b" type="submit">Submit Question</button>
            </form>
        </>
    )
}


export default QuestionFormModal;
