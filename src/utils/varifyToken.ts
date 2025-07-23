import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token: string) => {
	if (typeof token !== "string") {
		throw new Error("Invalid token specified: must be a string");
	}
	return jwtDecode(token);
};
