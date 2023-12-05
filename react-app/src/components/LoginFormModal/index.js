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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
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
        <button type="submit">Log In</button>
        <button onClick={handleDemoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
