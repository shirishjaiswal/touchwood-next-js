import { getUserId } from "@/lib/session/session";
import serverApiRequest from "@/utils/api/server-api-request";
import DELETE_EMAIL_TEMPLATE_BY_ID from "@/utils/endpoints/external/email-templates/delete";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	try {
		const templateId = Number(id);

		if (isNaN(templateId)) {
			return NextResponse.json(
				{ error: "Invalid template ID" },
				{ status: 400 }
			);
		}
		const userId = await getUserId();
		const deleteResponse = await serverApiRequest({
			connection: DELETE_EMAIL_TEMPLATE_BY_ID({ templateId: templateId, userId: userId}),
		});

		if (deleteResponse?.error) {
			return NextResponse.json(
				{ error: "Email template not found or could not be deleted" },
				{ status: 404 }
			);
		}

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unexpected error occurred";
		console.error("Error deleting email template:", errorMessage);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
