import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './AlbumsList.css'

import { fetchAllAlbums } from "../../store/albums";
import { fetchAllUsers } from "../../store/session";

export default function AlbumsList() {

    const dispatch = useDispatch()
    const albumsArr = useSelector((state) => state.albums.albums)
    const users = useSelector((state) => state.users.users)

    useEffect(() => {
        dispatch(fetchAllAlbums())
        dispatch(fetchAllUsers())
    }, [dispatch])


    if (!albumsArr) return null
    if(!users) return null

    const albums = Object.values(albumsArr)

    console.log("ALL USERS", users)

    return (
        <div className="albums-list">
        <div className="albums-container">

            {albums.map((album) => {
                return <div key={album.id} className="album-tile">

                    {/* <div>{album.category}</div> */}
                    <Link to={`/albums/${album.id}`} className="Link">
                    <img src={album.cover} className="album-image" />
                    <div className="album-tile-title">{album.title}</div>
                    </Link>


                    <div>
                    <Link to={`/users/${album.user_id}`} className="Link">
                    <img src={users[album.user_id].profile_image} className="album-user-image"></img>

                    <div className="album-tile-title">{users[album.user_id].username}</div>
                    </Link>
                        </div>

                    

                    <div></div>
                    
                    </div>
            })}

        </div>
        </div>
    )
} 