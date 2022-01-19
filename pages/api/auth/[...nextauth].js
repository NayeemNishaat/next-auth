import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

// Note: It return a handler function!
export default NextAuth({
	session: { jwt: true },
	providers: [
		Credentials({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client
					.db()
					.collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email
				});

				if (!user) {
					client.close();
					throw new Error("No user found!");
				}

				// Important: await because async function returns a promise.
				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					throw new Error("Couldn't log in!");
				}

				client.close();
				return {
					email: user.email
				}; // Note: returning {} will let next-auth know authorization succeeded. And it will populate the object with JWT and the specified key-value pairs!
			}
		})
	],
	secret: "NayeemNishaat"
});
