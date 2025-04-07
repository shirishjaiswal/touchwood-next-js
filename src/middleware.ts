import { NextResponse, NextRequest } from "next/server";
import { getCookie, getUserRoles } from "@/lib/session/session";

export async function middleware(request: NextRequest) {
	const url = request.nextUrl.pathname;

	if (!process.env.SESSION_REF) {
		return NextResponse.next();
	}

	const isAuthenticated = await getCookie();
	const userRoles = await getUserRoles();

	// Define public paths
	const publicPaths = ["/", /^\/auth\/.*/];

	// Check if current path is a public path
	const isPublicPath = publicPaths.some((path) =>
		typeof path === "string" ? path === url : path.test(url)
	);

	// Admin Route Protection
	if (url.startsWith("/admin")) {
		if (!isAuthenticated) {
			// Redirect unauthenticated users to login
			const loginUrl = new URL("/auth/login", request.url);
			loginUrl.searchParams.set("redirect", url);
			return NextResponse.redirect(loginUrl);
		}

		if (!userRoles.includes("admin")) {
			// Redirect non-admin users trying to access admin routes
			return NextResponse.redirect(new URL("/home/user/role", request.url));
		}
	}

	// User Route Protection: Redirect non-admin users to /home/user/role first time
	if (isAuthenticated && !userRoles.includes("admin")) {
		const hasVisitedRolePage = request.cookies.get("visitedRolePage");

		if (!hasVisitedRolePage && url !== "/home/user/role") {
			// Set a cookie to remember the visit
			const response = NextResponse.redirect(
				new URL("/home/user/role", request.url)
			);
			response.cookies.set("visitedRolePage", "true", { path: "/" });
			return response;
		}
	}

	// Prevent authenticated users from accessing auth pages
	if (isAuthenticated && url.startsWith("/auth")) {
		return NextResponse.redirect(new URL("/home/user/role", request.url));
	}

	// Redirect unauthenticated users trying to access protected pages
	if (!isAuthenticated && !isPublicPath) {
		const loginUrl = new URL("/auth/login", request.url);
		loginUrl.searchParams.set("redirect", url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
