import { fetchCreateComment } from "./albums";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER"
const GET_USERS = "session/GET_USERS"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const getUser = (user) => ({
	type: GET_USER,
	user
})

const getUsers = (users) => ({
	type: GET_USERS,
	users
})



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (user) => async (dispatch) => {
	const { email, password } = user;
	
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};


export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: formData
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};




//GET ALL USERS
export const fetchAllUsers = () => async(dispatch) => {
	const res = await fetch ('/api/users')
	if(res.ok) {
		const {users} = await res.json()
		dispatch(getUsers(users))
		return users
	} else {
		const data = await res.json()
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
		return data
	}
}


const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_USER:
			return { user: action.payload }
		default:
			return state;
	}
}