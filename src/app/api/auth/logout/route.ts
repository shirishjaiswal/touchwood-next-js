import { deleteSession } from "@/lib/session/session";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
	try {
		await deleteSession();
		return NextResponse.json({ message: "Logout successful" });
	} catch (error) {
		console.error("Logout error:", error);
		return NextResponse.json(
			{ error: "An internal server error occurred" },
			{ status: 500 }
		);
	}
}
