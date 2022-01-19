import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";

function MainNavigation() {
	const { data, status } = useSession();
	// console.log(data, status);

	function logoutHandler() {
		// Note: This returns a promis after that promis nextJs will automatically clear the cookie and update useSession.
		signOut();
	}

	return (
		<header className={classes.header}>
			<Link href="/">
				<a>
					<div className={classes.logo}>
						Next Auth
					</div>
				</a>
			</Link>
			<nav>
				<ul>
					{!data && status !== "loading" && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}

					{data && (
						<li>
							<Link href="/profile">
								Profile
							</Link>
						</li>
					)}

					{data && (
						<li>
							<button onClick={logoutHandler}>
								Logout
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
