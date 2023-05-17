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
    const [space, setSpace] = useState("");
    const [context, setContext] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const spaces = ['Technology', 'Exercise', 'Personal Health', 'Financial Well-Being', 'Travel', 'Career Goals', 'Miscellaneous'];

    const spacesObj = {
        'Technology': 1,
        'Exercise': 2,
        'Personal Health': 3,
        'Financial Well-Being': 4,
        'Travel': 5,
        'Career Goals': 6,
        'Miscellaneous': 7
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data;
        if (type === "create") {
            data = await dispatch(addNewQuestionThunk({

            }))
        }
    }

    return (
        <>
            <h2 className="modal-title">{title}</h2>
            <form onSubmit={handleSubmit}>
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
                    Select a Space
                    <select
                    className="space-select"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    >
                    {spaces.map(space => (
                        <option
                        key={space}
                        value={space}
                        >
                        {space}
                        </option>
                    ))}
                    </select>
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
                <button className="clickable submit-question site-color-b" type="submit">Add Question</button>
            </form>
        </>
    )
}


export default QuestionFormModal;
