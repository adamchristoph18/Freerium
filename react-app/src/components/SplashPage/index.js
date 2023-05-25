import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./SplashPage.css";

function SplashPage() {
    return (
        <div className="splash-page">
            <div className="splash-page-left">
                <div className="left-side-content">
                    <p className="welcome-to">Welcome to</p>
                        <div className="freerium-plus-logo">
                            <h1 className="site-color freerium-splash-page">Freerium</h1>
                            <img
                                className='site-logo-splash'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPanACp25XOMkqLljNvWRkUiwXgn4ZY6nJZmPEvxIw1j859faaai-9fUnmDNSnEnoH2JM&usqp=CAU"
                                alt='freerium-logo'/>
                        </div>
                    <p className="site-tag-line">A wellness site for questions, answers, knowledge, and freedom.</p>
                </div>
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
