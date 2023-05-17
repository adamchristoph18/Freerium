import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewQuestionThunk } from "../../store/questions";
import ErrorHandler from "../ErrorHandler";
import "./QuestionFormModal.css";

function QuestionFormModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    return (
        <>
            <p>Hello world</p>
        </>
    )
}


export default QuestionFormModal;
