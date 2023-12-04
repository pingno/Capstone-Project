import { normalizeObj } from "./normalize"

//Action Type Constants
const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS"
const CREATE_ALBUM = "albums/CREATE_ALBUM"
const UPDATE_ALBUM = "albums/UPDATE_ALBUM"
const REMOVE_ALBUM = "albums/REMOVE_ALBUM"

const GET_ALL_POSTS = "posts/GET_ALL_POSTS"
const ADD_POST = "posts/CREATE_POST"
const UPDATE_POST = "posts/UPDATE_POST"
const REMOVE_POST = "posts/REMOVE_POST"

const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS"
const ADD_COMMENT = "comments/CREATE_COMMENT"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

//Action Creators

//ALBUMS
const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

const addAlbum = (album) => ({
    type: CREATE_ALBUM,
    album
})

const editAlbum = (album) => ({
    type: UPDATE_ALBUM,
    album
})

const removeAlbum = (albumId) => ({
    type: REMOVE_ALBUM,
    albumId
})

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



// GET ALL ALBUMS
export const fetchAllAlbums = () => async (dispatch) => {
    const res = await fetch('/api/albums')
    if (res.ok) {
        const {albums} = await res.json();
        dispatch(getAllAlbums(albums))
        return albums
    } else {
        const data = await res.json();
        console.log(data)
        return data
    }
}

// CREATE ALBUM
export const fetchAddAlbum = (formData) => async (dispatch) => {
    try {
        const res = await fetch('/api/albums/create', {
            method: "POST",
            body: formData
        })

        if (res.ok) {
            const {album} = await res.json()
            dispatch(addAlbum(album))
            return album
        } else {
            const data = await res.json();
            console.log("There was an error creating album")
            return data
        }
    } catch (error) {
        console.error('error occurred', error);
        return [' error occurred'];
    }
}


// EDIT ALBUM
export const fetchUpdateAlbum = (formData, albumId) => async(dispatch) => {

    try {
        const res = await fetch(`/api/albums/${albumId}/edit`, {
            method: "PUT",
            body: formData
        })

        if(res.ok) {
            const product = await res.json();
            console.log('this is the dataproduct', product)
            dispatch(editAlbum(product))
            return product
        } else {
            const data = await res.json();
            console.log("There was an error updating product",data)
            return data;
        }
    } catch (error) {
        console.error('error occurred', error);
        return [' error occurred'];
    }
}

export const fetchDeleteAlbum = (albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/delete`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json();
        await dispatch(removeAlbum(albumId))
        await dispatch(fetchAllAlbums())
        return data
    } else {
        const data = await res.json()
        return data;
    }
}


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
        const {post} = await res.json();
        await dispatch(addPost(post))
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
        const {post} = await res.json();
        dispatch(editPost(post))
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
        const {comment} = await res.json()
        await dispatch(addComment(comment))
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
        const {comment} = await res.json()
        await dispatch(editComment(comment))
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
        const {comment} = await res.json()
        await dispatch(removeComment(comment))
        await dispatch(fetchAllComments())
        return comment
    } else {
        const data = await res.json()
        return data
    }
}

const initialState = {}

const albumsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_ALBUMS:
            newState = { ...state }
            newState.albums = normalizeObj(action.albums)
            return newState

        case CREATE_ALBUM:
            newState = { ...state } 
            newState.albums[action.album.id] = action.album
            return newState

        case UPDATE_ALBUM:
            newState = { ...state }
            newState.albums[action.album.id] = action.album
            return newState;

        case REMOVE_ALBUM:
            newState = { ...state }
            delete newState.albums[action.albumId]
            return newState

        case ADD_POST:
            newState = { ...state }
            newState.albums[action.post.album_id].posts = [...newState.albums[action.post.album_id].posts, action.posts]
            return newState

        case UPDATE_POST:
            newState = { ...state }
            let index=0
            for (let i = 0; i < newState.albums[action.post.album_id].posts.length; i++){
                let post = newState.albums[action.post.album_id].posts[i];
                if ( post.id === action.album.id ) {
                    index=i;
                    break
                }
            }
            newState.albums[action.post.album_id].posts[index] = action.post;
            return newState;

        case REMOVE_POST:
            newState = { ...state }
            let index_to_remove = 0
            for (let i = 0; i < newState.albums[action.albumId].posts.length; i++){
                let post = newState.albums[action.albumId].posts[i]
                if (post.id === action.postId) {
                    index_to_remove = i
                    break
                }
            }
            delete newState.albums[action.albumId].posts[index_to_remove]
            return newState;

        default:
            return state
    }
}

export default albumsReducer