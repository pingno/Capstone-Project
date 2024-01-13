import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AddAlbumModal from "../AddAlbumModal";
import About from "../About";

import logo from './logo.png'


import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
  
  <>

    <div className="nav-container">

      <div id="top-left">

        {sessionUser ? <NavLink exact to="/home">
        <img src={logo} alt="logo" style={{height: "50px", width: "50px"}}/>
      </NavLink> : <NavLink exact to="/">
        <img src={logo} alt="logo" style={{height: "50px", width: "50px"}}/>
      </NavLink>}


      {/* <div className="login-buttons">
      <NavLink exact to="/about"><button>About Us</button></NavLink>
    </div> */}



    
      </div>

      <div id="top-center">

      {sessionUser ? <NavLink exact to="/home" id="middle-link">
          Dayze
        </NavLink> : <NavLink exact to="/" id="middle-link">
          Dayze
        </NavLink>}



      </div>

      <div>

        {sessionUser ?         
        <div id="top-right"> 


          
      <div className="login-buttons">

          <OpenModalButton
            buttonText="Add Album"
            modalComponent={<AddAlbumModal userId={sessionUser.id} />}
            />
            </div>

          <div id="loggedas">
            <div>Logged in as </div>
            <div>{sessionUser.username}</div>
          </div>
          
          <Link to={`/users/${sessionUser.id}`}>
          <img src={sessionUser.profile_image} style={{border: "2px solid black", borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover"}}/>
          </Link>

             {isLoaded && <ProfileButton user={sessionUser} />}
        </div> 

        : 

        <>
        {/* <ProfileButton user={sessionUser} /> */}

        <>


          <div className="top-right-right">

            
          </div>

        <div className="login-buttons2">

            <OpenModalButton
              buttonText="Login"
              modalComponent={<LoginFormModal />}
              />
        
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              />

            </div>


            

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
