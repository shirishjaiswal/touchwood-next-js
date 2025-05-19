import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_ACCESS_MODIFIERS from "@/utils/endpoints/external/data-access-modifier/get-all";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const apiResponse = await serverApiRequest({
			connection: GET_ALL_ACCESS_MODIFIERS(),
		});

		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: "Failed to fetch access modifiers" },
				{ status: 400 }
			);
		}

		return NextResponse.json(apiResponse.data);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
