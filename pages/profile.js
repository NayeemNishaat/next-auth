import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
	return <UserProfile />;
}

// Important: This getStaticProps() only runs during build but can be later using revalidate. Not for every incoming request. That's why we will use getServerSideProps() which runs for every incoming request!
// export function getStaticProps() {}
export const getServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req });

	// Remark: We used server side redirection. So we can get rid of client side redirection from UserProfile page. And it's the better approach!
	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false
			}
		};
	}

	return {
		props: { session }
	};
};

export default ProfilePage;
