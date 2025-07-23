import { jwtDecode } from 'jwt-decode';
import type { User } from '../redux/features/auth/authSlice'; // adjust path if needed

export const verifyToken = (token: string): User => {
	if (typeof token !== 'string') {
		throw new Error('Invalid token specified: must be a string');
	}
	return jwtDecode<User>(token);
};
