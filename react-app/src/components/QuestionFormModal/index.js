import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewQuestionThunk, updateQuestionThunk } from "../../store/questions";
import "./QuestionFormModal.css";

function QuestionFormModal({ type, title, question }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [questionTitle, setQuestionTitle] = useState("");
    const [space, setSpace] = useState("Miscellaneous");
    const [context, setContext] = useState("");
    const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const spaces = ['Technology', 'Exercise', 'Personal Health', 'Financial Well-Being', 'Travel', 'Career Goals'];

    useEffect(() => {
        if (type === 'update') {
            setQuestionTitle(question.title);
            setContext(question.context);
            setImage(question.image_url);
        }
    }, []);

    const override = {
        display: "absolute",
        margin: "0 auto",
        borderColor: "red",
        bottom: "320px",
        right: "150px"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const spacesObj = {
            'Technology': 1,
            'Exercise': 2,
            'Personal Health': 3,
            'Financial Well-Being': 4,
            'Travel': 5,
            'Career Goals': 6,
            'Miscellaneous': 7
        };

		const formDataNew = new FormData();
        formDataNew.append("title", questionTitle);
        formDataNew.append("context", context);
        formDataNew.append("image", image);
        formDataNew.append("upvotes", 0);
        formDataNew.append("downvotes", 0);
        formDataNew.append("userId", sessionUser.id);
        formDataNew.append("spaceId", spacesObj[space]);

        const formDataUpdate = new FormData();
        formDataUpdate.append("title", questionTitle);
        formDataUpdate.append("context", context);
        formDataUpdate.append("image", image);

        // aws uploads can be a bit slow—displaying
		// some sort of loading message is a good idea
		if (image) {
		    setLoading(true);
        }

        let data;
        if (type === "create") {
            data = await dispatch(addNewQuestionThunk(formDataNew));
        } else {
            data = await dispatch(updateQuestionThunk({
                id: question?.id,
                formDataUpdate
            }));
        }

        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    }

    return (
        <>
            <h2 className="modal-title">{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className='modal-errors'>
                        {Object.values(errors).map(error => (
                            <p key={error} className='error-p'>
                                {error}
                            </p>
                        ))}
                    </div>
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
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    />
                </label>
                {type === 'create' && (
                    <label className="modal-input-label">
                    Select a Space
                    <select
                        className="space-select"
                        value={space}
                        onChange={(e) => setSpace(e.target.value)}
                    >
                        <option value="" selected="selected">Miscellaneous</option>
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
                )}
                <label className="modal-input-label">
                    Image URL (Optional)
                    <input
                        placeholder="Image URL to support your question"
                        className="modal-input"
                        name='questionTitle'
                        type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
                    />
                <br/>
                <img style={{width: "100px", paddingLeft: "10px"}} src={image} alt="" />
                </label>
                <button className="clickable submit-question site-color-b" type="submit">
                    {type === 'create' ? "Add Question" : "Update Question"}</button>
                    <PuffLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={150}
                        />
            </form>
        </>
    )
}


export default QuestionFormModal;
