import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [profileImageUrl, setProfileImageUrl] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("image", image);
        formData.append("password", password);

		if (password === confirmPassword) {
			// aws uploads can be a bit slow—displaying
			// some sort of loading message is a good idea
			setImageLoading(true);
			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1 className="modal-title">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className='modal-errors'>
					{Object.values(errors).map(error => (
						<p key={error} className='error-p'>
							{error}
						</p>
					))}
				</div>
				<label className="modal-input-label">
					First Name
					<input
						type="text"
						placeholder="first name here"
						className="modal-input"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label className="modal-input-label">
					Last Name
					<input
						type="text"
						placeholder="last name here"
						className="modal-input"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<label className="modal-input-label">
					Username
					<input
						type="text"
						placeholder="pick a cool username!"
						className="modal-input"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label className="modal-input-label">
					Email
					<input
						type="text"
						placeholder="email here"
						className="modal-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className="modal-input-label">
					Profile Image URL (optional)
					<input
						placeholder="image URL here"
						className="modal-input"
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
				<label className="modal-input-label">
					Password
					<input
						type="password"
						placeholder="strong passwords are suggested"
						className="modal-input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label className="modal-input-label">
					Confirm Password
					<input
						type="password"
						placeholder="confirm password here"
						className="modal-input"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				<button className="sign-up-button site-color-b clickable" type="submit">Sign Up</button>
				{imageLoading && <p className="loading-p">Loading...</p>}
			</form>
		</>
	);
}

export default SignupFormModal;
