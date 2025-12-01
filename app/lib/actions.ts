// app/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

/**
 * Refresh homepage fact by revalidating /
 */
export async function refreshFact() {
  revalidatePath('/');
}

/**
 * Reseed breeds (optional admin action)
 */
export async function reseedBreeds() {
  revalidatePath('/seed');
}
