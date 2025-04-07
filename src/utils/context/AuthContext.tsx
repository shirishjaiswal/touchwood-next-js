'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

export type AuthUser = {
	userId: string;
	username: string;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
	phoneVerified: boolean;
	email: string;
};

type AuthContextType = {
	user: AuthUser | null;
	setUser: (user: AuthUser | null) => void;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
	isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
	children: ReactNode;
	initialUser?: AuthUser | null;
};

export const AuthProvider = ({ children, initialUser = null }: AuthProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(initialUser);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (!user) {
			const storedUser = localStorage.getItem('authUser');
			if (storedUser) {
				try {
					setUser(JSON.parse(storedUser));
				} catch {
					localStorage.removeItem('authUser');
				}
			}
		}
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (user) {
			localStorage.setItem('authUser', JSON.stringify(user));
		} else {
			localStorage.removeItem('authUser');
		}
	}, [user]);

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
