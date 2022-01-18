import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);

	return hashedPassword;
}

export async function verifyPassword(
	password,
	hashedPassword
) {
	// Important: await is used because compare returns a promise.
	const isValid = await compare(password, hashedPassword);

	return isValid;
}
