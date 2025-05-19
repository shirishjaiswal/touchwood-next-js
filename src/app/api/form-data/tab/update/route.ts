import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { getUserId } from "@/lib/session/session";
import UPDATE_FORM_DATA_TAB from "@/utils/endpoints/external/form-data/tab/update";
import { FormDataTab_UpWrite } from "@/lib/types/form-data/tab";

export async function PUT(request: Request) {
  try {
    const rawBody = await request.json();

    const body: FormDataTab_UpWrite = rawBody;

    const userId = await getUserId();

    const { data, error, status } = await serverApiRequest({
      connection: UPDATE_FORM_DATA_TAB(body, userId),
    });

    if (status !== 200) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
