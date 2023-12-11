import React, { useState, useEffect, useRef } from "react";

import './LandingPage.css'
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";


function LandingPage(){
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
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
    
      const closeMenu = () => setShowMenu(false);

    return (
        <div className="landing-background">

        <div className="landing-page-container">
            <div>
            Welcome to Dayze
            </div>

            A social platform built for a community to share their ideas, interests, and passions.  
            Instead of starting one day, here you can start at day one.  No matter how far you are in your journey,
             what matters is what you do during the process.  

        <div className="login-buttons">

            <OpenModalButton
              buttonText="Get Started"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
              </div>

        </div>
        </div>

    )
}


export default LandingPage;