import { NextResponse } from "next/server";
import serverApiRequest from "@/utils/api/server-api-request";
import { getUserId } from "@/lib/session/session";
import DELETE_FORM_DATA_GROUP from "@/utils/endpoints/external/form-data/group/delete";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    
    const userId = await getUserId();

    const {error, status} = await serverApiRequest({
      connection: DELETE_FORM_DATA_GROUP(id, userId),
    });

    if (status !== 204) {
      return NextResponse.json(
        { error: error },
        { status: 400 }
      );
    }

    return NextResponse.json ({ status: 204 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
