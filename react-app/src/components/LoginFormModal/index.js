import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ErrorHandler from "../ErrorHandler";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({ email: email, password: password }));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  // demo user sign in
  const demoUser = e => {
    e.preventDefault();
    return dispatch(login({ email: 'demo@aa.io', password: 'password' }))
        .then(closeModal);
  };

  return (
    <div className="login-modal">
      <h1 className="modal-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className='modal-errors'>
              {Object.values(errors).map(error => (
                  <p key={error} className='error-p'>
                      {error}
                  </p>
              ))}
          </div>
        <label className="modal-input-label">
          Email
          <input
            type="text"
            className="modal-input"
            placeholder="Please provide your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="modal-input-label">
          Password
          <input
            type="password"
            className="modal-input"
            placeholder="Please provide your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="login-button clickable" type="submit">Log In</button>
      </form>
      <div className="demo-user-link clickable site-color" onClick={demoUser}>
        Log in as a demo user instead!</div>
    </div>
  );
}

export default LoginFormModal;
