import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({email, password}));
    if (data) {
      setErrors(data);
    } else {
        history.push('/home')
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
    })).then(history.push('/home')).then(closeModal)
}



  return (
    <div className="form-container">
      <h1>Welcome back!</h1>
      <div className="login-h2">We've missed you</div>
      

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <p key={idx} style={{ fontSize: "12px", color: "red", fontFamily: "arial" }}>{error}</p>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            />
            </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </label>
        <div className="lb2">

        <button type="submit">Login</button>

        <button onClick={handleDemoUser} >Login as Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
