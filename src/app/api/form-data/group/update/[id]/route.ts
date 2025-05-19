import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { getUserId } from "@/lib/session/session";
import UPDATE_FORM_DATA_GROUP from "@/utils/endpoints/external/form-data/group/update";
import { FormDataGroup_UpWrite } from "@/lib/types/form-data/group";

const createUniqueKey = (label: string, userId: number) => {
	const timestamp = Date.now() / 1000;
	const formattedLabel = label.replace(/\s+/g, "-").toLowerCase();
	const uniqueKey = `${formattedLabel}-${userId}-${timestamp}`;
	return uniqueKey;
};

export async function PUT(
	request: Request,
	{ params }: { params: { id: number } }
) {
	try {
		const { id } = await params;

		const rawBody = await request.json();

		const {
			label,
			description,
			labelVisible,
			multiple,
			required,
			formDataTabId,
		} : FormDataGroup_UpWrite = rawBody;

		const userId = await getUserId();

		const uniqueKey = createUniqueKey(label, userId);

		const payload: FormDataGroup_UpWrite = {
			uniqueKey,
			label,
			description,
			labelVisible,
			multiple,
			required,
			formDataTabId,
		};

		const {data, error, status} = await serverApiRequest({
			connection: UPDATE_FORM_DATA_GROUP(id, payload, userId),
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
