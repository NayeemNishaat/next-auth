import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
	if (req.method !== "POST") return;

	const data = req.body;

	const { email, password } = data;

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				"Invalid Input. Password should also be at least 7 characters!"
		});

		return;
	}

	const client = await connectToDatabase();

	const db = client.db();

	// Important: Must await to fulfill the promise else we will get a promise object!
	const existingUser = await db
		.collection("users")
		.findOne({
			email: email
		});

	if (existingUser) {
		res.status(422).json({
			message: "User exists with this Email already!"
		});
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password); // Important: Very careful with async tasks/promise. Because they return an object if we don't use await/then method to resolve the promise!

	const result = await db.collection("users").insertOne({
		email,
		password: hashedPassword
	});

	res.status(201).json({ message: "Created User!" });
	client.close();
}

export default handler;
