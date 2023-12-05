import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { fetchAddAlbum } from "../../store/albums";
import { fetchAllAlbums } from "../../store/albums";


function AddAlbumModal(userId) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector((state) => state.session.user)

    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [cover, setCover] = useState(null)

    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, yesSubmitted] = useState(false)


    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!category) errorList.category = "Category is required"
        if(!title) errorList.title = "Title is required"
        if(!description) errorList.description = "Description is required"
        if(!cover) errorList.cover = "Please add a cover image (.jpg, .jpeg, .png, .gif, .pdf)"

        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }



        const form = new FormData()
        form.append("category", category)
        form.append("title", title)
        form.append("description", description)
        form.append("cover", cover)

        // if(cover) newAlbum.cover = cover
        // setImageLoading(true)

        const res = await dispatch(fetchAddAlbum(form))
        if(res.errors) {
            setErrors(res.errors)
        } else {
            closeModal()
        }


        if(!res.errors){
            history.push(`/users/${user.id}`)
            yesSubmitted(true)
        }
        
    }





    useEffect(() => {
        yesSubmitted(false);
        setErrors({});
      }, [submitted]);


  return (
    <>
      <h1>Create Album</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {/* {errors.category && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.category}</p>
          )} */}
        </label>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* {errors.title && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.title}</p>
          )} */}
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* {errors.description && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.description}</p>
          )} */}
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

        <button type="submit">Create Album</button>

        {/* {imageLoading && <p>Loading...</p>} */}

      </form>
    </>
  );
}

export default AddAlbumModal;
