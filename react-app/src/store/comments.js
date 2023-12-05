import { normalizeObj } from "./normalize"
import { fetchAllAlbums } from "./albums"

const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const ADD_COMMENT = "comments/CREATE_COMMENT"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"


//COMMENTS

const getAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const editComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})



//GET ALL COMMENTS
export const fetchAllComments = () => async (dispatch) => {
    const res = await fetch('/api/comments')
    if (res.ok) {
        const {comments} = await res.json();
        dispatch(getAllComments(comments))
        return comments
    } else {
        const data = await res.json();
        console.log(data)
        return data
    }
}


// CREATE COMMENT
export const fetchCreateComment = (comment, postId) => async (dispatch) => {
    const res = await fetch(`/posts/${postId}/comments/create`, {
        method: "POST",
        body: comment
    })

    if (res.ok) {
        const comment = await res.json()
        await dispatch(addComment(comment))
        // await dispatch(fetchAllAlbums())
        await dispatch(fetchAllComments())
        return comment
    } else {
        const data = await res.json()
        return data
    }
}

//EDIT COMMENT
//Double check
export const fetchEditComment = (comment, commentId) => async (dispatch) => {
    const res = await fetch (`/comments/${commentId}/edit`, {
        method: "PUT",
        body: comment
    })

    if (res.ok) {
        const comment = await res.json()
        await dispatch(editComment(comment))
        // await dispatch(fetchAllAlbums())
        await dispatch(fetchAllComments())
        return comment
    } else {
        const data = await res.json()
        return data
    }
}

//DELETE COMMENT
export const fetchDeleteComment = (commentId) => async (dispatch) => {
    const res = await fetch (`/comments/${commentId}/delete`, {
        method: "DELETE"
    })

    if(res.ok) {
        const comment = await res.json()
        await dispatch(removeComment(comment))
        // await dispatch(fetchAllAlbums())
        await dispatch(fetchAllComments())
        return comment
    } else {
        const data = await res.json()
        return data
    }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState = { ...state }
            newState.comments = normalizeObj(action.comments)
            return newState

        case ADD_COMMENT:
            newState = { ...state } 
            newState.comments[action.comment.id] = action.comment
            return newState

        case UPDATE_COMMENT:
            newState = { ...state }
            newState.comments[action.comment.id] = action.comment
            return newState;

        case REMOVE_COMMENT:
            newState = { ...state }
            delete newState.comments[action.commentId]
            return newState


        default:
            return state
    }
}

export default commentsReducer