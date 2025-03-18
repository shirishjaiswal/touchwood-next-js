import { NextResponse } from 'next/server';
import { loginSchema } from '@/app/api/auth/validation';
import konsole from '@/utils/logging/konsole';
import serverApiRequest from '@/utils/api/server-api-request';
import LOGIN, {
} from '@/utils/endpoints/external/auth/login';
import { createSession } from '@/lib/session/session';
import { LOGIN_PAYLOAD_TYPE } from '@/utils/endpoints/types/auth/login';

export async function POST(request: Request) {
  try {
    const body: LOGIN_PAYLOAD_TYPE = await request.json();

    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsedData.error.errors.map((e) => e.message),
        },
        { status: 400 },
      );
    }

    const apiResponse = await serverApiRequest({
      connection: LOGIN(body),
    });

    if (!apiResponse?.data) {
      return NextResponse.json(
        { error: apiResponse?.error || 'Authentication failed' },
        { status: 500 },
      );
    }

    await createSession(
      apiResponse.data.accessToken,
      apiResponse.data.refreshToken,
    );

    const response = NextResponse.json({ status: 200 });

    return response;
  } catch (error) {
    konsole.error('Login API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
