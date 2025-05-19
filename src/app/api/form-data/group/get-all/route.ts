import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import GET_ALL_FORM_DATA_GROUP from "@/utils/endpoints/external/form-data/group/get-all";

export async function GET() {
	try {
		const { data, error, status } = await serverApiRequest({
			connection: GET_ALL_FORM_DATA_GROUP(),
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
