import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import EditComment from "../EditComment";
import DeleteComment from "../DeleteComment";

function EDCommentButton({ commentId }) {
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

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
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
              buttonText="Edit Comment"
              onItemClick={closeMenu}
              modalComponent={<EditComment commentId={commentId} />}
            />

            <OpenModalButton
              buttonText="Delete Comment"
              onItemClick={closeMenu}
              modalComponent={<DeleteComment commentId={commentId} />}
            />
          </>

      </ul>
    </>
  );
}

export default EDCommentButton;
