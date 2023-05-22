import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./SplashPage.css";

function SplashPage() {
    return (
        <div className="splash-page">
            <div className="splash-page-left">
                <p className="welcome-to">Welcome to</p>
                <h1 className="site-color freerium-splash-page">Freerium</h1>
                <p className="site-tag-line">A wellness site for questions, answers, knowledge, and freedom.</p>
            </div>
            <div className="splash-page-right">
                <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                />

                <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                />
            </div>
        </div>
    )
}

export default SplashPage;
