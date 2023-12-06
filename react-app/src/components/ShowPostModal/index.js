import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams,} from "react-router-dom/cjs/react-router-dom.min";

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllPosts } from "../../store/posts";
import { fetchAllComments} from '../../store/comments'

import AddComment from "../AddComment";
import OpenModalButton from "../OpenModalButton";
import EditComment from '../EditComment';
import DeleteComment from '../DeleteComment'

function ShowPostModal() {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts?.posts);

  useEffect(() => {
    dispatch(fetchAllAlbums());
    dispatch(fetchAllPosts());
    dispatch(fetchAllComments())
  }, [dispatch]);

  if (!posts) return null;

  const post = posts[postId];
  const postComments = post.comments;

  return (
    <>
      <div className="post-left">
        <img src={post.image} style={{ height: "400px", width: "400px" }} />
      </div>

      <div className="post-right">
        <div>{post.headline}</div>
        <div>{post.content}</div>
        <div>{post.date}</div>
        <div>Likes {post.likes}</div>
      </div>

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


              <div>Add Like</div>
              <div>Remove Like</div>
            </div>
          );
        })}

        {user && user.id != post.user_id ? (
          <AddComment postId={postId} />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default ShowPostModal;
