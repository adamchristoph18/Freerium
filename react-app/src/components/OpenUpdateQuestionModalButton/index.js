import React from 'react';
import { useModal } from '../../context/Modal';
import "./OpenUpdateQuestionModalButton.css";

function OpenUpdateQuestionModalButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = (e) => {
        e.stopPropagation();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        <button
            className='update-question-button site-color-b clickable'
            onClick={onClick}>{buttonText}</button>
        );
    }

export default OpenUpdateQuestionModalButton;
