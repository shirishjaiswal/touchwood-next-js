import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import CREATE_FORM_DATA_TAB from "@/utils/endpoints/external/form-data/tab/create";
import {
  Client_FormDataTab_Write,
  Server_FormDataTab_Write,
} from "@/lib/types/form-data/tab";
import { getUserId } from "@/lib/session/session";

const createUniqueKey = (label: string, userId: number) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const formattedLabel = label.replace(/\s+/g, "-").toLowerCase();
  const uniqueKey = `${formattedLabel}-${userId}-${timestamp}`;
  return uniqueKey;
};

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const { label, description, position }: Client_FormDataTab_Write = rawBody;

    const userId = await getUserId();

    const uniqueKey = createUniqueKey(label, userId);

    const payload: Server_FormDataTab_Write = {
      uniqueKey,
      label,
      description,
      position,
      link: `/home/configuration/profile/${uniqueKey}`,
    };

    const { data, error, status } = await serverApiRequest({
      connection: CREATE_FORM_DATA_TAB(payload, userId),
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
