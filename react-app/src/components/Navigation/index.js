import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">

      <div id="top-left">Logo</div>

      <div id="top-center">
        <NavLink exact to="/" id="middle-link">
          Dayze
        </NavLink>
      </div>

      <div id="top-right">
        {/* {sessionUser ?         <div>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div> : <><button>Sign Up</button> <button>Log In</button></>} */}

        {isLoaded && <ProfileButton user={sessionUser} />}

       </div>

    </div>
  );
}

export default Navigation;
