import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const sessionUser = useSelector((state) => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    setShowMenu(false)
    history.push('/')
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-solid fa-list dropdown-dd" ></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>

            <div className="dropdown1">

              <div className="ddpic">
              <Link to={`/users/${sessionUser.id}`}>
          <img src={sessionUser.profile_image} style={{border: "2px solid black", borderRadius: "50%", height: "50px", width: "50px", objectFit: "cover", marginBottom: "10px"}}/>
          </Link>
              </div>

              <div className="ddstuff">
              <li style={{paddingBottom: "3px", fontWeight: "bold"}}>{user.username}</li>
              <li style={{paddingBottom: "10px", fontSize: "14px"}}>{user.email}</li>
              </div>

            </div>


{/* 
            <li style={{fontWeight: "bold", textAlign: 'left', paddingBottom: "3px"}}>Username</li>
            <li style={{paddingBottom: "3px"}}>{user.username}</li>
            <li style={{fontWeight: "bold", textAlign: 'left', paddingBottom: "3px"}}>Email</li>
            <li style={{paddingBottom: "10px"}}>{user.email}</li> */}
            
            <div style={{border: "1px solid black", marginBottom: "6px", width: "100%"}}></div>

              <Link to={`/users/${user.id}`} className="dropdown-link">Your Page</Link>

              <div style={{border: "1px solid lightgrey", marginTop: "6px"}}></div>


            <li className="lb2">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
