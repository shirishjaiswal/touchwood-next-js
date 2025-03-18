'use server';

import { cookies } from 'next/headers';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import konsole from '@/utils/logging/konsole';

export interface TW_JwtPayload extends JwtPayload {
  roles: string[];
  id: number;
}

const COOKIE_NAME = 'Touch_Wood_Session';

/* Create session and store access & refresh tokens securely */
export async function createSession(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  try {
    const decryptedAccessToken = jwtDecode<JwtPayload>(accessToken);
    const decryptedRefreshToken = jwtDecode<JwtPayload>(refreshToken);

    const accessTokenExpiry = decryptedAccessToken.exp;
    const refreshTokenExpiry = decryptedRefreshToken.exp;

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: accessTokenExpiry
        ? new Date(accessTokenExpiry * 1000)
        : undefined,
      sameSite: 'strict',
      path: '/',
    });

    cookieStore.set(COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: refreshTokenExpiry
        ? new Date(refreshTokenExpiry * 1000)
        : undefined,
      sameSite: 'strict',
      path: '/',
    });
  } catch (error) {
    console.error('Failed to create session:', error);
    throw new Error('Failed to create session');
  }
}

/* Delete session by clearing stored tokens */
export async function deleteSession(): Promise<void> {
  try {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
  } catch (error) {
    console.error('Failed to delete session:', error);
    throw new Error('Failed to log out user');
  }
}

/* Validate token by checking expiration */
export async function validateToken(
  accessToken: string | undefined,
): Promise<boolean> {
  try {
    if (!accessToken) return false;
    const decryptedAccessToken = jwtDecode<JwtPayload>(accessToken);
    const accessTokenExpiry = decryptedAccessToken.exp;
    return accessTokenExpiry
      ? accessTokenExpiry > Math.floor(Date.now() / 1000)
      : false;
  } catch (error) {
    konsole.error('Error in createSession:', error);
    throw new Error('Failed to create session');
  }
}

/* Get user role from JWT token */
export async function getRole(
  accessToken: string | undefined,
): Promise<string> {
  try {
    if (!accessToken) return '';
    const decryptedAccessToken = jwtDecode<TW_JwtPayload>(accessToken);
    return decryptedAccessToken.roles?.[0] || '';
  } catch (error) {
    konsole.error('Error in getting role:', error);
    throw new Error('Failed to get roles');
  }
}

/**
 * Get user ID from JWT token
 */
export async function getUserId(
  accessToken: string | undefined,
): Promise<number> {
  try {
    if (!accessToken) return -1;
    const decryptedAccessToken = jwtDecode<TW_JwtPayload>(accessToken);
    return decryptedAccessToken.id ?? -1;
  } catch (error) {
    console.error('Error in getting user ID:', error);
    throw new Error('Failed to get user ID');
  }
}

/**
 * Get username (subject) from JWT token
 */
export async function getUserName(
  accessToken: string | undefined,
): Promise<string> {
  try {
    if (!accessToken) return '';
    const decryptedAccessToken = jwtDecode<JwtPayload>(accessToken);
    return decryptedAccessToken.sub ?? '';
  } catch (error) {
    console.error('Error in getting username:', error);
    throw new Error('Failed to get username');
  }
}
