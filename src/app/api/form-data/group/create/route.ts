import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { getUserId } from "@/lib/session/session";
import CREATE_FORM_DATA_GROUP from "@/utils/endpoints/external/form-data/group/create";
import { Client_FormDataGroup_Write, Server_FormDataGroup_Write } from "@/lib/types/form-data/group";

const createUniqueKey = (label: string, userId: number) => {
	const timestamp = Math.floor(Date.now() / 1000);
	const formattedLabel = label.replace(/\s+/g, "-").toLowerCase();
	const uniqueKey = `${formattedLabel}-${userId}-${timestamp}`;
	return uniqueKey;
};

export async function POST(request: Request) {
	try {
		const rawBody = await request.json();

		const {
			label,
			description,
			labelVisible,
			multiple,
			required,
			formDataTabId,
		} : Client_FormDataGroup_Write = rawBody;

		const userId = await getUserId();

		const uniqueKey = createUniqueKey(label, userId);

		const payload: Server_FormDataGroup_Write = {
			uniqueKey,
			label,
			description,
			labelVisible,
			multiple,
			required,
			formDataTabId,
		};

		const { data, error, status } = await serverApiRequest({
			connection: CREATE_FORM_DATA_GROUP(payload, userId),
		});

		if (status !== 201) {
			return NextResponse.json({ error: error }, { status: 400 });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
