import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import "./AnswerFormModal.css";

function AnswerFormModal({ type, title }) {
    const dispatch = useDispatch();

    return (
        <>
            <h2 className="modal-title">{title}</h2>
        </>
    )
}


export default AnswerFormModal;
