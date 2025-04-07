import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import CREATE_ACCESS_MODIFIER, { CREATE_ACCESS_MODIFIER_PAYLOAD } from "@/utils/endpoints/external/access-modifier/create";

export async function POST(request: Request) {
	try {
		const rawBody = await request.json();

		const { accessModifierValue } = rawBody;

		const accessModifier : CREATE_ACCESS_MODIFIER_PAYLOAD = {
			value: accessModifierValue,
		}
		
		const apiResponse = await serverApiRequest({
			connection: CREATE_ACCESS_MODIFIER(accessModifier),
		});

		if (!apiResponse?.data) {
			return NextResponse.json(
				{ error: "Failed to create config email" },
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
