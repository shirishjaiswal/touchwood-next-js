'use server';

export async function fetchConfigUserDetails(slug: string) {
  const response = await fetch(`/api/home/users/${slug}`);
  return await response.json();
}