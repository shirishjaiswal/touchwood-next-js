import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { getUserId } from "@/lib/session/session";
import GET_FORM_DATA_TAB_BY_ID from "@/utils/endpoints/external/form-data/tab/get-by-id";

export async function GET(
	request: Request,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = await params;
		
		const userId = await getUserId();

		const apiResponse = await serverApiRequest({
			connection: GET_FORM_DATA_TAB_BY_ID(id, userId),
		});

		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: "Failed to delete" },
				{ status: 400 }
			);
		}

		return NextResponse.json(apiResponse.data, { status: 201 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
