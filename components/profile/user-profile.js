import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
// import { useSession } from "next-auth/react";

function UserProfile() {
	// const { data, status } = useSession();
	// console.log(data, status);
	// Important: If we use useEffect we shouldn't make it async. So, we can use then() or write another async function inside the useEffect().

	// Remark: Not required bacause we have implemented server side redirection
	// if (status === "loading")
	// 	return (
	// 		<p className={classes.profile}>Loading...</p>
	// 	);

	// if (status === "unauthenticated") {
	// 	window.location.href = "/auth";
	// }

	// if (status === "authenticated") {
	// 	return (
	// 		<section className={classes.profile}>
	// 			<h1>Your User Profile</h1>
	// 			<ProfileForm />
	// 		</section>
	// 	);
	// }

	async function changePasswordHandler(passwordData) {
		const response = await fetch(
			"/api/user/change-password",
			{
				method: "PATCH",
				body: JSON.stringify(passwordData),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		const data = await response.json();

		console.log(data);
	}

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm
				onChangePassword={changePasswordHandler}
			/>
		</section>
	);
}

export default UserProfile;
