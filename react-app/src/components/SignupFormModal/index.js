import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom"
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const { closeModal } = useModal();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profile_image, setProfile_Image] = useState(null)
	const [bio, setBio] = useState("")
	
	const [errors, setErrors] = useState([]);
	const [imageLoading, setImageLoading] = useState(false);
	const [submitted, yesSubmitted] = useState(false)


	// const defaultImage = "https://png.pngtree.com/png-vector/20221117/ourmid/pngtree-user-flat-design-long-shadow-glyph-icon-default-figure-anonymous-vector-png-image_41304650.jpg"


	useEffect(() => {
		yesSubmitted(false)
		setErrors({})
	}, [submitted])

	
	const handleSubmit = async (e) => {
		e.preventDefault()
		let errorList = {}

		if(!username || username.length > 20) errorList.username = "Name is required and must be less than 20 characters"
		if(!email || !email.includes("@")) errorList.email = "Valid email is required"
		if (!password) errorList.password = "Valid Password is required";
		if (password !== confirmPassword) errorList.confirmPassword = "Passwords must match";

		if(Object.values(errorList).length > 0) {
			setErrors(errorList);
			return
		}

		const formData = new FormData()
		formData.append("username", username)
		formData.append("email", email)
		formData.append("password", password)

		if(profile_image){
			formData.append("profile_image", profile_image)
		}
		if(bio){
			formData.append("bio", bio)
		}

		// setImageLoading(true)
		// const res = await dispatch(signUp(form))
		// if(!res.errors) {
		// 	history.push('/') //home?
		// 	yesSubmitted(true)
		// 	// reset()
		// }

		if (password === confirmPassword) {
			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}



	}

	// const reset = () => {
	// 	setUsername("")
	// 	setEmail("")
	// 	setPassword("")
	// 	setConfirmPassword("")
	// 	setProfile_Image(null)
	// 	setBio("")
	// }

	// useEffect(() => {
	// 	yesSubmitted(false)
	// 	setErrors({})
	// }, [submitted])




	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">

				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}

				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					{/* {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )} */}
				</label>

				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label>
					Profile Image
					<input
						type="file"
						accept="immage/*"
						onChange={(e) => setProfile_Image(e.target.files[0])}

					/>
				</label>

				<label>
					Bio
					<textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}

					/>
				</label>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>

				{imageLoading && <p>Loading...</p>}
			</form>
		</>
	);
}

export default SignupFormModal;