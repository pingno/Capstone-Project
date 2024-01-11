import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

import { fetchAllAlbums } from "../../store/albums";
// import { fetchAllPosts } from "../../store/posts";
import { fetchCreatePost } from "../../store/posts";



function AddPostModal( {albumId} ) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const user = useSelector((state) => state.session.user)

    const [headline, setHeadline] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)

    const [errors, setErrors] = useState({})

    const [submitted, yesSubmitted] = useState(false)

    const [loading, setLoading] = useState(false)

 
    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!headline) errorList.headline = "Headline is required"
        if(!content) errorList.content = "Content is required"
        if(!image) errorList.image = "Please add a post image (.jpg, .jpeg, .png, .gif, .pdf)"

        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }

        const form = new FormData()
        form.append("headline", headline)
        form.append("content", content)
        form.append("image", image)


        setLoading(true)

       
        dispatch(fetchCreatePost(form, albumId)).then((res) => {
          setLoading(false)
        if(res.errors) {
            setErrors(res.errors)
        } else {
            closeModal()
            yesSubmitted(true)
        }
        })

    }


    useEffect(() => {
        yesSubmitted(false);
        setErrors({});
      }, [submitted]);


  return (
    <div style={{margin: "25px"}}>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" >
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <label>
          Headline
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />

          {errors.headline && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.headline}</p>
          )}

        </label>

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="signup-bio"
          />

          {errors.content && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.content}</p>
          )}

        </label>

        <label>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {errors.image && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.image}</p>
          )}

        </label>
            <div className="lb2">

        <button type="submit">Create Post</button>
            </div>

            {loading && <p className="loading-div">Loading...</p>}

      </form>
    </div>
  );
}

export default AddPostModal;
