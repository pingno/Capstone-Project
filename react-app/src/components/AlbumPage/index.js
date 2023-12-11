import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AlbumPage.css";

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllPosts } from "../../store/posts";
import { fetchAllUsers } from "../../store/user";

import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import OpenModalButton from "../OpenModalButton";
import AddPostModal from "../AddPostModal";

import EDPostButton from "../EDPost";
import EDAlbumButton from "../EDAlbum";

export default function AlbumPage() {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const albumsObj = useSelector((state) => state.albums.albums);

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllAlbums());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (!albumsObj) return null;
  const album = albumsObj[albumId];

  if (!album.posts) return null;
  const albumPosts = album.posts;

  if (!users) return null;

  return (
    <>
      <div className="album-container">
        <div className="album-1">
          <img src={album.cover} />
        </div>

        <div className="album-2-container">
          <div className="album-2-top">
            <Link to={`/users/${album.user_id}`}>
              <img src={users[album.user_id].profile_image} />
            </Link>
            <Link to={`/users/${album.user_id}`} className="created-by">
              Created by {users[album.user_id].username}
            </Link>

            <div>
              <div>
                {Object.values(users[album.user_id].albums).length} Albums
              </div>
              <div>
                {Object.values(users[album.user_id].posts).length} Posts
              </div>
              <div>
                {Object.values(users[album.user_id].followers).length} Followers
              </div>
            </div>


          </div>

          <div className="album-2-bottom">
            <div className="album-page-category">{album.category}</div>
            <div className="album-page-title">{album.title}</div>
            <div className="album-page-description">{album.description}</div>
          </div>
        </div>
      </div>

      {sessionUser && sessionUser.id == album.user_id ? (
        <div className="login-buttons">
          <OpenModalButton
            buttonText="Add Post"
            modalComponent={<AddPostModal albumId={albumId} />}
          />
        </div>
      ) : (
        <div></div>
      )}

      <div className="album-posts-container">
        {albumPosts.map((post) => {
          return (
            <div key={post.id} className="each-post-tile">
              <Link to={`/posts/${post.id}`}>
                <img src={post.image} className="album-page-post-image" />
              </Link>

              <div className="album-page-post-headline">{post.headline}</div>

              {sessionUser && sessionUser.id == album.user_id ? (
                <div className="login-buttons" title="edit/delete post">
                  <EDPostButton postId={post.id} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
