import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import './AlbumsList.css'

import { fetchAllAlbums } from "../../store/albums";


export default function AlbumsList() {
    const dispatch = useDispatch()

    const albumsArr = useSelector((state) => state.albums.albums)


    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    if (!albumsArr) return null

    const albums = Object.values(albumsArr)


    return (
        <>
        <div className="albums-container">

            {albums.map((album) => {
                return <div key={album.id} className="album-tile">

                    {/* <div>{album.category}</div> */}
                    <div>{album.title}</div>
                    <Link to={`/albums/${album.id}`}>
                    <img src={album.cover} style={{width: "400px", height: "300px"}} />
                    </Link>
                    <div>{album.description}</div>
                    
                    </div>
            })}

        </div>
        </>
    )
}