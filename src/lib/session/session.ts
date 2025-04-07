import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { jwtDecode } from "jwt-decode";
import konsole from "@/utils/logging/konsole";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export const sessionRef = process.env.SESSION_REF;
const refreshTokenRef = "touch_wood_refresh_token";

interface JwtPayload {
	id: number;
	userId: string;
	email: string;
	roles?: string[];
	exp?: number;
}

export async function encrypt(payload: {
	id: number;
	email: string;
	roles: string[];
	expiresAt: Date;
}) {
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);

	return token;
}

export interface SessionPayload {
	id: number;
	userId: string;
	email: string;
	roles?: string[];
	exp?: number;
}

export async function decrypt(
	session: string | undefined = ""
): Promise<SessionPayload | undefined> {
	if (!session) return undefined;
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return {
			id: payload.id as number,
			userId: payload.userId as string,
			email: payload.email as string,
			roles: payload.roles as string[] | undefined,
			exp: payload.exp as number | undefined,
		} as SessionPayload;
	} catch {
		return undefined;
	}
}

/**
 * Create a session by adding id, userId, email and roles to the JWT payload.
 */
export async function createSession(
	id: number,
	email: string,
	roles: string[]
) {
	const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
	const session = await encrypt({
		id,
		email,
		roles,
		expiresAt: sessionExpiresAt,
	});
	const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const refreshToken = await encrypt({
		id,
		email,
		roles,
		expiresAt: refreshTokenExpiresAt,
	});
	const cookieStore = await cookies();

	if (sessionRef) {
		cookieStore.set(sessionRef, session, {
			httpOnly: true,
			secure: true,
			expires: sessionExpiresAt,
			sameSite: "lax",
			path: "/",
		});
	} else {
		throw new Error("SESSION_REF is not defined");
	}

	cookieStore.set(refreshTokenRef, refreshToken, {
		httpOnly: true,
		secure: true,
		expires: refreshTokenExpiresAt,
		sameSite: "lax",
		path: "/",
	});
}

// Get session sesstionref
export async function getCookie() {
	const cookieStore = await cookies();
	if (!sessionRef) {
		throw new Error("SESSION_REF is not defined");
	}
	return cookieStore.get(sessionRef)?.value;
}

/**
 * Update the session by adding id, userId, email and roles to the JWT payload.
 */
export async function updateSession() {
	const session = (await cookies()).get("session")?.value;
	const payload = await decrypt(session);

	if (!session || !payload) {
		return null;
	}

	const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
	const cookieStore = await cookies();
	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	if (sessionRef) {
		cookieStore.delete(sessionRef);
	} else {
		console.error("SESSION_REF is not defined");
	}
}

/* Validate token by checking expiration */
export async function validateToken(
	accessToken: string | undefined
): Promise<boolean> {
	try {
		if (!accessToken) return false;
		const decryptedAccessToken = jwtDecode<JwtPayload>(accessToken);
		const accessTokenExpiry = decryptedAccessToken.exp;
		return accessTokenExpiry
			? accessTokenExpiry > Math.floor(Date.now() / 1000)
			: false;
	} catch (error) {
		konsole.error("Error in validateToken:", error);
		throw new Error("Failed to validate token");
	}
}

export async function getUserRoles(): Promise<string[]> {
	try {
		const accessToken = await getCookie();
		if (!accessToken) return [];
		const decodedToken = jwtDecode<JwtPayload>(accessToken);
		return decodedToken.roles || [];
	} catch (error) {
		console.error("Error in getting roles:", error);
		throw new Error("Failed to get roles");
	}
}

/**
 * Get user ID from JWT token
 */
export async function getUserId(): Promise<number> {
	try {
		const accessToken = await getCookie();
		if (!accessToken) return -1;
		const decodedToken = jwtDecode<JwtPayload>(accessToken);
		return decodedToken.id ?? -1;
	} catch (error) {
		console.error("Error in getting user ID:", error);
		throw new Error("Failed to get user ID");
	}
}

/**
 * Get user email from JWT token
 */
export async function getUserEmail(): Promise<string> {
	try {
		const accessToken = await getCookie();
		if (!accessToken) return "";
		const decodedToken = jwtDecode<JwtPayload>(accessToken);
		return decodedToken.email ?? "";
	} catch (error) {
		console.error("Error in getting user email:", error);
		throw new Error("Failed to get user email");
	}
}
