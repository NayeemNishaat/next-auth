import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({
	Component,
	pageProps: { session, ...pageProps }
}) {
	return (
		// Important: By using SessionProvider we are setting the session and then the useSession hook will not be called when nextJs sees this session! Thus optimizing the performance. If session is not found then useSession will perform it's job.
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;
