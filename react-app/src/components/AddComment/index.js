import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

import { fetchAllAlbums } from "../../store/albums";
import { fetchCreateComment } from "../../store/comments";


function AddPostModal( {postId} ) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.session.user)

    const [content, setContent] = useState("")

    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, yesSubmitted] = useState(false)

 
    useEffect(() => {
        dispatch(fetchAllAlbums())
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorList = {}

        if(!content) errorList.content = "Title is required"
   
        if(Object.values(errorList).length > 0) {
            setErrors(errorList);
            return
        }

        const form = new FormData()
        form.append("content", content)

        // setImageLoading(true)
        return await dispatch(fetchCreateComment(form, postId)).then(closeModal())

    }


    // useEffect(() => {
    //     yesSubmitted(false);
    //     setErrors({});
    //   }, [submitted]);


  return (
    <>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>

        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        

        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* {errors.content && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.content}</p>
          )} */}
        </label>



        <button type="submit">Add Comment</button>

        {/* {imageLoading && <p>Loading...</p>} */}

      </form>
    </>
  );
}

export default AddComment;
