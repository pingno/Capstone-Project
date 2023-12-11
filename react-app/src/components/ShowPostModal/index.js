import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllPosts } from "../../store/posts";
import { fetchAllComments } from "../../store/comments";
import { fetchAllUsers } from "../../store/user"

import { fetchAddLike } from "../../store/posts";
import { fetchRemoveLike } from "../../store/posts";

import AddComment from "../AddComment";
import OpenModalButton from "../OpenModalButton";
import EditComment from "../EditComment";
import DeleteComment from "../DeleteComment";

import EDCommentButton from "../EDComment";
import EDPostButton from "../EDPost";

import "./ShowPost.css";

function ShowPostModal() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts?.posts);

  const users = useSelector((state) => state.users.users)

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllAlbums());
    dispatch(fetchAllComments());
    dispatch(fetchAllUsers())
  }, [dispatch]);

  if (!posts) return null;
  if (!users) return null;

  const post = posts[postId];

  const addLike = async (e) => {
    dispatch(fetchAddLike(post));
  };

  const removeLike = async (e) => {
    dispatch(fetchRemoveLike(post));
  };

  return (
    <>
      <Link to={`/albums/${post.album_id}`} style={{textDecoration: "none",}}>
        <i className="fa-solid fa-arrow-left" style={{color: "black"}}></i>
        <div style={{ color: "black", fontFamily: "Arial"}}>Back to album</div>
      </Link>


      

      <div className="post-post-container">

      <div className="single-post-container">

        <div className="post-left">
          <img src={post.image} className="post-left-image" />
          <div>

          <i className="fa-solid fa-thumbs-up" onClick={(e) => addLike()} style={{cursor: "pointer"}}></i>
          <i className="fa-solid fa-thumbs-down" onClick={(e) => removeLike()} style={{cursor: "pointer"}}></i>
          <div style={{fontFamily: "Arial"}}>{post.likes} Likes </div>
            </div>
        </div>


        <div className="post-right">

          <div className="pp-headline">{post.headline}</div>
          <div className="pp-content">{post.content}</div>
          {/* <div className="pp-date">{post.date}</div> */}
          <div className="pp-numcomments">{post.num_comments} Comments </div>

          <div className="comment-container">

            {post.comments.map((comment) => {
              return (
                <div key={comment.id} className="comment-tile">

                  <div style={{fontWeight: "bold"}}>{users[comment.user_id].username}</div>

                  <div className="ppc-content">{comment.content}</div>


                  
                  {user && user.id == comment.user_id ? (

                      <div className="login-buttons" title="edit/delete comment">

                    <EDCommentButton commentId={comment.id} title="Edit/Delete Comment"/>
                      </div>



                  ) : (
                    <div></div>
                  )}




                </div>
              );
            })}

          </div>
            <AddComment postId={postId} />
        </div>
      </div>


      </div>

      {user.id == post.user_id ? 
      
      <div className="login-buttons" title="edit/delete post"> 
      <EDPostButton postId={postId}/> 
      </div>
      
      
      : <></>}
    </>
  );
}

export default ShowPostModal;
