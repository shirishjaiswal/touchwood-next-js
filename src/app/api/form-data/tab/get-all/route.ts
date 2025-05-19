import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_FORM_DATA_TAB from "@/utils/endpoints/external/form-data/tab/get-all";

export async function GET() {
	try {

		const apiResponse = await serverApiRequest({
			connection: GET_ALL_FORM_DATA_TAB(),
		});

		if (!apiResponse?.data) {
			return NextResponse.json({ error: "Failed to Fetch" }, { status: 400 });
		}

		return NextResponse.json(apiResponse.data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
