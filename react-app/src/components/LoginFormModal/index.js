import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({email, password}));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };


  const handleDemoUser = (e) => {
    e.preventDefault()
    setEmail("matt@aa.io")
    setPassword("password")
    return dispatch(sessionActions.login({
      email: "matt@aa.io",
      password: "password"
    })).then(closeModal)
}



  return (
    <div className="form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <p key={idx} style={{ fontSize: "11px", color: "red", fontFamily: "arial" }}>{error}</p>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-buttons">

        <button type="submit">Log In</button>
        <button onClick={handleDemoUser}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
