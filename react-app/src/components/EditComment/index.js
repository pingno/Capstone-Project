import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

// import { fetchAllAlbums } from "../../store/albums";
// import { fetchAllPosts } from "../../store/posts";
import { fetchAllComments } from "../../store/comments";
import { fetchEditComment } from "../../store/comments";
import { useModal } from "../../context/Modal";


function EditComment( {commentId} ) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const comment = useSelector((state) => state.comments.comments[commentId])
 
    const [content, setContent] = useState(comment ? comment.content : "")
    const [errors, setErrors] = useState({})
    const [submitted, yesSubmitted] = useState(false)

 
    useEffect(() => {
        // dispatch(fetchAllAlbums())
        // dispatch(fetchAllPosts())
        dispatch(fetchAllComments())
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

        return await dispatch(fetchEditComment(form, commentId)).then(closeModal())

    }

    useEffect(() => {
        yesSubmitted(false);
        setErrors({});
      }, [submitted]);


  return (
    <>
      <h1>Edit Comment</h1>
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
            className="signup-bio"
          />
          {errors.content && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.content}</p>
          )}
        </label>

            <div className="login-buttons">

        <button type="submit">Update Comment</button>
            </div>
      </form>

    </>
  );
}

export default EditComment;
