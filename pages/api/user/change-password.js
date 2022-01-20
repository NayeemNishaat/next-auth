import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { verifyPassword } from "../../../lib/auth";
import { getSession } from "next-auth/react";

async function handler(req, res) {
	if (req.method !== "PATCH") {
		res.status(422).json({
			message: "Bad Request"
		});
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({
			message: "Not Authenticated"
		});
		return;
	}

	const userEmail = session.user.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const client = await connectToDatabase();
	const usersCollection = client.db().collection("users");

	const user = await usersCollection.findOne({
		email: userEmail
	});

	if (!user) {
		res.status(404).json({
			message: "User not found!"
		});
		client.close();
		return;
	}

	const currentPassword = user.password;

	const passwordsAreEqual = await verifyPassword(
		oldPassword,
		currentPassword
	);
	// Note: 422 typo
	if (!passwordsAreEqual) {
		res.status(403).json({
			message: "User permission is not authorized"
		});
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(newPassword);

	await usersCollection.updateOne(
		{ email: userEmail },
		{ $set: { password: hashedPassword } }
	);
	client.close();
	res.status(200).json({ message: "Password Updated" });
}

export default handler;
