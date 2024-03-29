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


	const defaultImage = "https://png.pngtree.com/png-vector/20221117/ourmid/pngtree-user-flat-design-long-shadow-glyph-icon-default-figure-anonymous-vector-png-image_41304650.jpg"

	const disabled = !username || !email || !password || !bio

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
		if(password.length < 6) errorList.password = "Password must be longer than 6 characters"
		if (!profile_image) errorList.profile_image = "Please upload a profile image"
		if(bio.length > 500 || bio.length < 1) errorList.bio = "Bio is required and must be less than 500 characters"
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
				history.push('/home')
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
			<h1>Join our community today!</h1>
			<div className="signup-h2">start your journey here</div>
			<form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">

			{/* {errors && <div style={{ fontSize: "10px", color: "red" }}>{Object.values(errors)}</div>} */}

				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						
					/>
					{errors.username && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.username}</p>
          )}
				</label>

				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						
					/>
				{errors.email && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.email}</p>
          )}

				</label>

				<label>
					Profile Image
					<input
						type="file"
						accept="immage/*"
						onChange={(e) => setProfile_Image(e.target.files[0])}

					/>
{errors.profile_image && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.profile_image}</p>
          )}
					
				</label>

				<label>
					Bio
					<textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}
		  				className="signup-bio"
					/>
					{errors.bio && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.bio}</p>
          )}
				</label>

				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						
					/>

			{errors.password && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.password}</p>
          )}
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						
					/>

			{errors.confirmPassword && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.confirmPassword}</p>
          )}
				</label>

		



				<div className="signup-button">
				<button type="submit" >Sign Up</button>
				</div>

			



				{imageLoading && <p>Loading...</p>}
			</form>
		</>
	);
}

export default SignupFormModal;