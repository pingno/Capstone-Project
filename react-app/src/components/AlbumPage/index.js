import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './AlbumPage.css'

import { fetchAllAlbums } from "../../store/albums";


export default function AlbumPage() {
    const dispatch = useDispatch()
    const { albumId } = useParams()

    const sessionUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    const albumsArr = useSelector((state) => state.albums.albums)
    // console.log("ALBUMS OBJ", albumsArr)

    if (!albumsArr) return null

    const albums = Object.values(albumsArr)
    // console.log("ALBUMS", albums)

    const album = albums[albumId]

    const albumPosts = Object.values(albums[albumId].posts)
    // console.log("ALBUM POSTS", albumPosts)



    return (
        <>
        
        <div className="album-container">

   
                    <div>{album.category}</div>
                    <div>{album.title}</div>
                    <div>{album.description}</div>
                    <img src={album.cover} />



            <div className="album-posts-container">
                {albumPosts.map((post) => {
                    return <div key={post.id} className="each-post-tile">
                        <img src={post.image} />
                        <div>{post.headline}</div>
                        <div>{post.content}</div>
                        <div>{post.date}</div>
                        <div>Likes {post.likes}</div>

                        <div>Add Like</div>
                        <div>Remove Like</div>

                        </div>
                })}
            </div>

        </div>

        </>
    )
}