import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import EditPostModal from '../EditPostModal'
import DeletePostModal from '../DeletePostModal'


function EDPostButton({ postId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;


    //error here (contains)
    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
      <i class="fa-solid fa-ellipsis" />
      </button>
      <ul className={ulClassName} ref={ulRef}>

          <>
            <OpenModalButton
              buttonText="Edit Post"
              onItemClick={closeMenu}
              modalComponent={<EditPostModal postId={postId} />}
            />

            <OpenModalButton
              buttonText="Delete Post"
              onItemClick={closeMenu}
              modalComponent={<DeletePostModal postId={postId} />}
            />
          </>

      </ul>
    </>
  );
}

export default EDPostButton;
