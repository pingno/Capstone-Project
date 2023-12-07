import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import logo from './logo.png'


import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  console.log("session user stuff", sessionUser)

  return (
  
  <>

    <div className="nav-container">

      <div id="top-left">

      <NavLink exact to="/" id="middle-link">

        <img src={logo} alt="logo" style={{height: "50px", width: "50px"}}/>

        </NavLink>
      
      
      </div>

      <div id="top-center">
        <NavLink exact to="/" id="middle-link">
          Dayze
        </NavLink>
      </div>

      <div id="top-right">

        {sessionUser ?         
        <div>
          <Link to={`/users/${sessionUser.id}`}>
          <img src={sessionUser.profile_image} style={{border: "2px solid black", borderRadius: "50%", height: "30px", width: "30px"}}/>
          </Link>
             {isLoaded && <ProfileButton user={sessionUser} />}
        </div> 

        : 

        <>
        {/* <ProfileButton user={sessionUser} /> */}

        <>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </>

        </>
        }

          


       </div>

    </div>

          <div style={{border: "1px solid lightgray"}}></div>
          
    </>

  );
}

export default Navigation;
