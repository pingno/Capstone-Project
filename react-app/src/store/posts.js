import { normalizeObj } from "./normalize"
import { fetchAllAlbums } from "./albums"

const GET_ALL_POSTS = "posts/GET_ALL_POSTS"
const ADD_POST = "posts/CREATE_POST"
const UPDATE_POST = "posts/UPDATE_POST"
const REMOVE_POST = "posts/REMOVE_POST"

//POSTS
const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const editPost = (post) => ({
    type: UPDATE_POST,
    post
})

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
})




//GET ALL POSTS
export const fetchAllPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts')
    if (res.ok) {
        const {posts} = await res.json();
        dispatch(getAllPosts(posts))
        return posts
    } else {
        const data = await res.json()
        console.log(data)
        return data
    }
}



//CREATE A POST
export const fetchCreatePost = (post, albumId) => async (dispatch) => {

    const res = await fetch(`/api/albums/${albumId}/posts/create`, {
        method: "POST",
        body: post
    })

    if (res.ok) {
        const post = await res.json();
        console.log("THUNK POST", post)
        await dispatch(addPost(post))
        await dispatch(fetchAllAlbums())
        return post
    } else {
        const data = await res.json()
        return data;
    }
}

//EDIT A POST
export const fetchEditPost = (formData, postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/edit`, {
        method: "PUT",
        body: formData
    })

    if (res.ok) {
        const post = await res.json();
        await dispatch(editPost(post))
        await dispatch(fetchAllAlbums())
        return post
    } else {
        const data = await res.json();
        return data
    }
}

//DELETE A POST
//might need albumId
export const fetchDeletePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    })

    const data = await res.json()
    if (res.ok){
        await dispatch(removePost(postId))
        await dispatch(fetchAllAlbums())
        return data
    } else {
        return data
    }
}



const initialState = {}

const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_POSTS:
            newState = { ...state }
            newState.posts = normalizeObj(action.posts)
            return newState

        case ADD_POST:
            newState = { ...state } 
            newState.posts[action.post.id] = action.post
            return newState

        case UPDATE_POST:
            newState = { ...state }
            newState.posts[action.post.id] = action.post
            return newState;

        case REMOVE_POST:
            newState = { ...state }
            delete newState.posts[action.postId]
            return newState


        default:
            return state
    }
}

export default postsReducer