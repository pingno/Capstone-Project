import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './AlbumPage.css'

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllPosts } from "../../store/posts";
import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import OpenModalButton from "../OpenModalButton";
import AddPostModal from "../AddPostModal";


export default function AlbumPage() {
    const dispatch = useDispatch()
    const { albumId } = useParams()


    const sessionUser = useSelector((state) => state.session.user)
    const albumsObj = useSelector((state) => state.albums.albums) 


    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(fetchAllAlbums())
    }, [dispatch])
    


    if (!albumsObj) return null
    const album = albumsObj[albumId]

    if(!album.posts) return null
    const albumPosts = album.posts


    
    return (
        <>
        
        <div className="album-container">

   
                    <div>{album.category}</div>
                    <div>{album.title}</div>
                    <div>{album.description}</div>
                    <img src={album.cover} style={{height: "400px", width: "400px"}}/>

            {sessionUser && sessionUser.id == album.user_id ? <OpenModalButton
            buttonText="Add Post"
            modalComponent={<AddPostModal albumId={albumId} />}
            /> : <div></div>}

            <div className="album-posts-container">
                {albumPosts.map((post) => {
                    return <div key={post.id} className="each-post-tile">
                        <img src={post.image} style={{height: "400px", width: "400px"}}/>
                        <div>{post.headline}</div>
                        <div>{post.content}</div>
                        <div>{post.date}</div>
                        <div>Likes {post.likes}</div>

                        <div>Add Like</div>
                        <div>Remove Like</div>

                        {sessionUser && sessionUser.id == post.user_id ? <OpenModalButton
                         buttonText="Edit Post"
                        modalComponent={<EditPostModal  postId={post.id}/>}
                         /> : <div></div>}

                        {sessionUser && sessionUser.id == post.user_id ? <OpenModalButton
                         buttonText="Delete Post"
                        modalComponent={<DeletePostModal postId={post.id} />}
                         /> : <div></div>}


                        </div>
                })}
            </div>

        </div>

        </>
    )
}