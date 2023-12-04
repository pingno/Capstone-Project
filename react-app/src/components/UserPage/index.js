import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import OpenModalButton from "../OpenModalButton"


import './UserPage.css'

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllUsers } from '../../store/session'


export default function UserPage() {
    const dispatch = useDispatch()
    const { userId } = useParams()

  
    const sessionUser = useSelector((state) => state.session.user)

    const users = useSelector((state) => state.users.users)
    const albumsArr = useSelector((state) => state.albums.albums)


    useEffect(() => {
        dispatch(fetchAllAlbums())
        dispatch(fetchAllUsers())
    }, [dispatch])

    if(!users) return null
    if (!albumsArr) return null


    const user = users[userId]
    console.log("USER AT ID", user)

    const albums = Object.values(albumsArr)
    const userAlbums = albums.filter((album) => album.user_id == userId)
   
    // console.log("ALBUMS", albums)
    // console.log("USER ALBUMS", userAlbums)

    // const userPosts = Object.values(userAlbums.posts)
    // console.log("USER POSTS", userPosts)


    return (
        <>

            <div className="user-profile-container">

                <img src={user.profile_image} />
                <div>{user.username}</div>
                <div>{user.bio}</div>

            </div> 

        {sessionUser && sessionUser.id == user.id ? <div>hello</div> : <div>bye</div>}
           
            {/* <OpenModalButton
            buttonText="Add Album"
            modalComponent={<AddAlbumModal userId={user.id}  />}
            /> */}


            <div className="user-albums">
                {userAlbums.map((album) => {
                    return <div key={album.id} className="each-album-tile">
                        
                        <div>{album.title}</div>
                        <img src ={album.cover} />
                        {/* <div>{album.description}</div> */}

                        </div>
                })}

            </div>

            

        </>
    )
}