import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams,} from "react-router-dom/cjs/react-router-dom.min";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllPosts } from "../../store/posts";
import { fetchAllComments} from '../../store/comments'

import { fetchAddLike } from "../../store/posts";

import AddComment from "../AddComment";
import OpenModalButton from "../OpenModalButton";
import EditComment from '../EditComment';
import DeleteComment from '../DeleteComment'

function ShowPostModal() {

  const dispatch = useDispatch();
  const { postId } = useParams();

  const history = useHistory()

  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts?.posts);

  useEffect(() => {
    dispatch(fetchAllAlbums());
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments())
  }, [dispatch]);

  if (!posts) return null;

  const post = posts[postId];


   const addLike = (e) => {
     dispatch(fetchAddLike(post))
   }   


  return (
    <>

    <Link to={`/albums/${post.album_id}`}>
      <i className="fa-solid fa-arrow-left"></i>
    </Link>


      <div className="post-left">
        <img src={post.image} style={{ height: "400px", width: "400px" }} />
      </div>

      <div className="post-right">
        <div>{post.headline}</div>
        <div>{post.content}</div>
        <div>{post.date}</div>
        <div>{post.likes} Likes </div>
      </div>


      <i className="fa-solid fa-thumbs-up" onClick={(e) => addLike()}></i>
      <i className="fa-solid fa-thumbs-down"></i>


      <div>{post.num_comments} Comments </div>
  

      <div className="comment-container">
        {post.comments.map((comment) => {
          return (
            <div key={comment.id} className="comment-tile">
              <div>{comment.content}</div>

            
              {user && user.id == comment.user_id ? <OpenModalButton
                    buttonText="Edit Comment"
                    modalComponent={<EditComment commentId={comment.id}  />}
                    /> : <div></div>}

              {user && user.id == comment.user_id ? <OpenModalButton
                    buttonText="Delete Comment"
                    modalComponent={<DeleteComment commentId={comment.id}  />}
                    /> : <div></div>}

            </div>
          );
        })}


          <AddComment postId={postId} />

      </div>
    </>
  );
}

export default ShowPostModal;
