import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

import { fetchAllAlbums } from "../../store/albums";

import { fetchAllPosts } from "../../store/posts";
import { fetchCreatePost } from "../../store/posts";



function ShowPostModal( ) {
    const dispatch = useDispatch()

    const {postId} = useParams()
    console.log("POST ID" , postId)

    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state => state.posts?.posts))
  
  
    useEffect(() => {
      dispatch(fetchAllAlbums())
      dispatch(fetchAllPosts())
    }, [dispatch])

    if(!posts) return null
    console.log("SHOW POST", posts)

    const post = posts[postId]

    const postComments = post.comments
    console.log("POST COMMENTS", postComments)
    


  return (
    <>
    <img src={post.image} style={{height: "400px", width: "400px"}} />
    <div>{post.headline}</div>
    <div>{post.content}</div>
    <div>{post.date}</div>
    <div>Likes {post.likes}</div>

    <div className="comment-container">
      {post.comments.map((comment) => {
        return <div key={comment.id} className="comment-tile">
          
          
          <div>{comment.content}</div>

          
        </div>
      })}

    </div>

    <div>Add Like</div>
    <div>Remove Like</div>

    </>
  );
}

export default ShowPostModal;



