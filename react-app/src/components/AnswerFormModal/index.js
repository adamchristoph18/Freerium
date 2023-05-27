import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAnswerThunk, updateAnswerThunk } from "../../store/answers";
import { displayQuestionThunk, getAllQuestionsThunk } from "../../store/questions";
import { useModal } from "../../context/Modal";

import "./AnswerFormModal.css";

function AnswerFormModal({ type, title, question, answer, questionId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [body, setBody] = useState("");

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        if (type === 'update') {
            setBody(answer.body)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAnswer = {
            body,
            upvotes: 0,
            downvotes: 0,
            userId: sessionUser.id,
            questionId: question?.id
        };

        const updatedAnswer = {
            id: answer?.id,
            body
        };

        let data;
        if (type === 'create') {
            data = await dispatch(addNewAnswerThunk(newAnswer));
        } else {
            data = await dispatch(updateAnswerThunk(updatedAnswer));
        }

        if (data) {
            setErrors(data);
        } else {
            question ? await dispatch(displayQuestionThunk(question.id)) : await dispatch(displayQuestionThunk(questionId));
            await dispatch(getAllQuestionsThunk());
            closeModal();
        }
    };

    return (
        <>
            <h2 className="modal-title">{title}</h2>
            <form onSubmit={handleSubmit}>
                    <div className='modal-errors'>
                                {Object.values(errors).map(error => (
                                    <p key={error} className='error-ps'>
                                        {error}
                                    </p>
                                ))}
                    </div>
                <label className="modal-input-label">
                    Your answer
                    <textarea
                        type="text"
                        placeholder="Provide the reasoning and thought to your answer here"
                        className="modal-input question-reasoning"
                        name='body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <button className="clickable submit-question site-color-b" type="submit">
                    {type === 'create' ? "Add Answer" : "Update Answer"}</button>
            </form>
        </>
    )
}


export default AnswerFormModal;
