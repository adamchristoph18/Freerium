import NothingToShow from "../NothingToShow";
import "./PageNotFound.css";

function PageNotFound() {
    return (
        <div className="page-not-found">
            <p className="oops">Oops! Page Not Found</p>
            <NothingToShow />
        </div>
    )
}

export default PageNotFound;
