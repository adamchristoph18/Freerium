import PuffLoader from "react-spinners/PuffLoader";
import "./LoadingPage.css";


function LoadingPage() {
    return (
        <div className="loading-page">
            <PuffLoader
                loading={true}
                color="#36d7b7"
                size={150}
                />
        </div>
    )
}

export default LoadingPage;
