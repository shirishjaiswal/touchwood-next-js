import serverApiRequest from "@/utils/api/server-api-request";
import DELETE_ACCESS_MODIFIER_BY_ID from "@/utils/endpoints/external/access-modifier/delete";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params;

		const apiResponse = await serverApiRequest({
			connection: DELETE_ACCESS_MODIFIER_BY_ID( +id ),
		});

		if (apiResponse?.error) {
			return NextResponse.json(
				{ error: "AccessModifier not found or delete failed" },
				{ status: 404 }
			);
		}

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
