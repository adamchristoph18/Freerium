import "./UserProfilePage.css";

function UserProfilePage({ user }) {
    console.log("tisssss ------------> ", user);

    return (
        <div>
            <div className="user-profile-top">
                <img className="user-img-profile-page" src={user.profile_image_url} alt="" />
                <div className="user-info-card">
                    <h3 className="your">Your...</h3>
                    <p className="user-detail">Name: {user.first_name} {user.last_name}</p>
                    <p className="user-detail">Username: {user.username}</p>
                    <p className="user-detail">Account was last updated: {user.created_at}</p>
                    <p className="user-detail">Number of questions: {user.questions.length}</p>
                    <p className="user-detail">Number of answers: {user.answers.length}</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage;
