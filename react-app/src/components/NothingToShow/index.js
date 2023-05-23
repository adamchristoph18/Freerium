import { useHistory } from "react-router-dom";

import "./NothingToShow.css";


function NothingToShow() {
    const history = useHistory();

    return (
        <div className="no-info-container">
            <div>There is no information to show here.</div>
            <div>Return to the homepage to start interacting with the Freerium community!</div>
            <button className="go-to-home clickable" onClick={() => {history.push('/')}}>Go to home</button>
        </div>
    )
}

export default NothingToShow;
