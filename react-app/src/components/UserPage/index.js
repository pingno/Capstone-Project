import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import AddAlbumModal from "../AddAlbumModal";
import EditAlbumModal from "../EditAlbumModal";
import DeleteAlbumModal from "../DeleteAlbumModal";
import EDAlbumButton from "../EDAlbum";

import "./UserPage.css";

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllUsers } from "../../store/session";

import { fetchFollow } from "../../store/user";
import { fetchUnfollow } from "../../store/user";

export default function UserPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users?.users);
  const albumsArr = useSelector((state) => state.albums.albums);

  const [loading, setLoading] = useState(false)



  useEffect(() => {
    dispatch(fetchAllAlbums());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (!users) return null;
  if (!albumsArr) return null;

  const user = users[userId];
  if (!user) return null;

  const albums = Object.values(albumsArr);
  const userAlbums = albums.filter((album) => album.user_id == userId);

  const follow = () => {
    setLoading(true)
    dispatch(fetchFollow(userId)).then((res) => {
      setLoading(false)
    })
  };

  const unfollow = () => {
    setLoading(true)
    dispatch(fetchUnfollow(userId)).then((res) => {
      setLoading(false)
    })
  };

  return (
    <>
      <div className="user-profile-container">
        <img src={user.profile_image} className="user-profile-image" />
        <div className="user-page-username">{user.username}</div>

        <div className="users-num">
          <div>{user.albums.length} Albums</div>
          <div>{user.posts.length} Posts</div>
          <div>{user.followers.length} Followers</div>
        </div>

        <div className="user-page-bio">{user.bio}</div>

        {sessionUser &&
        sessionUser.id != user.id &&
        user.followers.filter((follower) => follower.id == sessionUser.id).length ? (
          <div className="login-buttons">
            <button onClick={() => unfollow()}>Unfollow</button>
            {loading && <p className="load-div">Loading unfollow...</p>}
          </div>
        ) : (
          <></>
        )}

      {sessionUser &&
        sessionUser.id != user.id &&
        !user.followers.filter((follower) => follower.id == sessionUser.id).length ? (
          <div className="login-buttons">
            <button onClick={() => follow()}>Follow</button>
            {loading && <p className="load-div">Loading follow...</p>}
          </div>
        ) : (
          <></>
        )}



        {sessionUser && sessionUser.id == user.id ? (
          <div className="login-buttons">
            <OpenModalButton
              buttonText="Add Album"
              modalComponent={<AddAlbumModal userId={user.id} />}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
<div className="album-albums">


      <div className="album-posts-container">
        {userAlbums.map((album) => {
          return (
            <div className="album-albums">
            <div className="each-post-tile">
              <Link to={`/albums/${album.id}`} className="link-image">
                <img src={album.cover} className="album-page-post-image" />
                {/* <div>{album.description}</div> */}
              </Link>

              <Link to={`/albums/${album.id}`} className="eatl">
                <div className="each-album-title">{album.title}</div>
              </Link>

              {sessionUser && sessionUser.id == user.id ? (
                <div className="threedot">
                  <EDAlbumButton albumId={album.id} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            </div>
          );
        })}
      </div>

      </div>

    </>
  );
}
