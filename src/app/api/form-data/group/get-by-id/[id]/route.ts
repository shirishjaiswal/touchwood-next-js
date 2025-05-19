import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_FORM_DATA_GROUP_BY_ID from "@/utils/endpoints/external/form-data/group/get-by-id";

export async function GET(
	request: Request,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = await params;

		const { data, error, status } = await serverApiRequest({
			connection: GET_FORM_DATA_GROUP_BY_ID(id),
		});

		if (status !== 200) {
			return NextResponse.json({ error: error }, { status: 400 });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
