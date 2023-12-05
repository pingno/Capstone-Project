import { normalizeObj } from "./normalize"

//Action Type Constants
const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS"
const CREATE_ALBUM = "albums/CREATE_ALBUM"
const UPDATE_ALBUM = "albums/UPDATE_ALBUM"
const REMOVE_ALBUM = "albums/REMOVE_ALBUM"




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
            const album = await res.json()
            dispatch(addAlbum(album))
            dispatch(fetchAllAlbums())
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
            dispatch(fetchAllAlbums())
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

// DELETE ALBUM
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


        default:
            return state
    }
}

export default albumsReducer