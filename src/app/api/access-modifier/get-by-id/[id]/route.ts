import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ACCESS_MODIFIER_BY_ID from "@/utils/endpoints/external/access-modifier/get-by-id";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;
		if (isNaN(+id)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const apiResponse = await serverApiRequest({
			connection: GET_ACCESS_MODIFIER_BY_ID(+id),
		});

		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: "Config email not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(apiResponse.data);
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{ status: 500 }
		);
	}
}
