import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

import { fetchAllAlbums } from "../../store/albums";
import { fetchUpdateAlbum } from "../../store/albums";

import "./EditAlbumModal.css"

function EditAlbumModal( {albumId} ) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector((state) => state.session.user)
    const album = useSelector((state) => state.albums.albums[albumId])

    const [category, setCategory] = useState(album ? album.category : "")
    const [title, setTitle] = useState(album ? album.title : "")
    const [description, setDescription] = useState(album ? album.description : "")
    const [cover, setCover] = useState(album ? album.cover : null)

    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, yesSubmitted] = useState(false)

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!category) errorList.category = "Category is required"
        if(!title) errorList.title = "Title is required"
        if(!description) errorList.description = "Description is required"
        // if(!cover) errorList.cover = "Please add a cover image (.jpg, .jpeg, .png, .gif, .pdf)"

        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }


        const form = new FormData()
        form.append("category", category)
        form.append("title", title)
        form.append("description", description)
        form.append("cover", cover)


        setLoading(true)

        dispatch(fetchUpdateAlbum(form, albumId)).then((res) => {
          setLoading(false)
          
          if(!res.errors){
            closeModal()
            history.push(`/users/${user.id}`)
            yesSubmitted(true)

        }

        })

        




    }


    useEffect(() => {
        yesSubmitted(false);
        setErrors({});
      }, [submitted]);


  return (
    <div style={{margin: "20px"}}>
      <h1>Update Album</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-album-form">
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {errors.category && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.category}</p>
          )}
        </label>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {errors.title && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.title}</p>
          )}
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: "100%", height: "150px"}}
          />
          {errors.description && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.description}</p>
          )}
        </label>

        <label>
          Cover
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
          />

          {/* {errors.cover && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.cover}</p>
          )} */}
        </label>

          <div className="lb2">

        <button type="submit">Update Album</button>
          </div>

          {loading && <p className="loading-div">Loading...</p>}

      </form>
    </div>
  );
}

export default EditAlbumModal;
