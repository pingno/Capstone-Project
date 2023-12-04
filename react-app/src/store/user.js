import { normalizeObj } from "./normalize"

const GET_USER = "session/GET_USER"
const GET_USERS = "session/GET_USERS"


const getUser = (user) => ({
	type: GET_USER,
	user
})

const getUsers = (users) => ({
	type: GET_USERS,
	users
})


//GET ALL USERS
export const fetchAllUsers = () => async(dispatch) => {
	const res = await fetch ('/api/users')
	if(res.ok) {
		const {users} = await res.json()
		dispatch(getUsers(users))
		return users
	} else {
		const data = await res.json()
		console.log(data)
		return data
	}
}


//GET USER BY ID
export const fetchUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`)
	if (res.ok) {
		const {user} = await res.json()
		dispatch(getUsers(user))
		return user;
	} else {
		const data = await res.json()
		console.log(data)
		return data
	}
}


const initialState = {}

export default function userReducer(state = initialState, action) {
    let newState;
	switch (action.type) {

		case GET_USERS:
			newState = { ...state }
            newState.users = normalizeObj(action.users)
            return newState
            
		default:
			return state;
	}
}