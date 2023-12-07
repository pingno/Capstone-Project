import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
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

    const [selectedPost, setSelectedPost] = useState(null);
 

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

                <div className="album-1">

                    <img src={album.cover} style={{height: "350px", width: "350px"}}/>

                </div>


                <div className="album-2">
                <Link to={`/users/${album.user_id}`}>View Creator</Link>


                    <div>{album.category}</div>
                    <div>{album.title}</div>
                    <div>{album.description}</div>
                </div>

                </div>

            {sessionUser && sessionUser.id == album.user_id ? <OpenModalButton
            buttonText="Add Post"
            modalComponent={<AddPostModal albumId={albumId} />}
            /> : <div></div>}
            

            {selectedPost && 
                    <>
                    <img src={selectedPost.image} style={{height: "400px", width: "400px"}}/>
                    <div>{selectedPost.headline}</div>
                    <div>{selectedPost.content}</div>
                    <div>{selectedPost.date}</div>
                    <div>Likes {selectedPost.likes}</div>
                    </>
                }

            <div className="album-posts-container">
                {albumPosts.map((post) => {
                    return <div key={post.id} className="each-post-tile">

                        <Link to={`/posts/${post.id}`}>
                        <img src={post.image} style={{height: "400px", width: "400px"}} 
                        
                        // onClick={() => {
                        //     setSelectedPost(post)
                        // }}/>

                        />

                        </Link>


                        <div>{post.headline}</div>

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




        </>
    )
}