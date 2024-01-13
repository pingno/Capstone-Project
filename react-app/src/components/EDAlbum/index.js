import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import EditAlbumModal from "../EditAlbumModal";
import DeleteAlbumModal from "../DeleteAlbumModal";

function EDAlbumButton({ albumId }) {
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
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  
  const ulClassName = "profile-dropdown2" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
      <i class="fa-solid fa-ellipsis" />
      </button>
      <ul className={ulClassName} ref={ulRef}>

          <div className="profile-dropdown3">
            <OpenModalButton
              buttonText="Edit Album"
              onItemClick={closeMenu}
              modalComponent={<EditAlbumModal albumId={albumId} />}
            />

            <OpenModalButton
              buttonText="Delete Album"
              onItemClick={closeMenu}
              modalComponent={<DeleteAlbumModal albumId={albumId} />}
            />
          </div>

      </ul>
    </>
  );
}

export default EDAlbumButton;
