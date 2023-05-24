import { useHistory } from "react-router-dom";

import "./NothingToShow.css";


function NothingToShow({ noAnswers }) {
    const history = useHistory();

    return (
        <div className="no-info-container">
            {noAnswers && (
                <p className="disclaimer">Disclaimer: If you submitted an answer to a question that ended up getting
                    deleted, <span className="was-also">your answer was also deleted</span>.
                </p>
            )}
            <div>There is no information to show here.</div>
            <div>Return to the homepage to start interacting with the Freerium community!</div>
            <button className="go-to-home clickable" onClick={() => {history.push('/')}}>Go to home</button>
        </div>
    )
}

export default NothingToShow;
