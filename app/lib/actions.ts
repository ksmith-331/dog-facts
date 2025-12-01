// app/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/app/lib/db';

/**
 * Refresh homepage fact by revalidating /
 */
export async function refreshFact() {
  revalidatePath('/');
}

/**
 * Add a new fact manually
 */
export async function addFact(text: string) {
  await sql`
    INSERT INTO dog_facts (text, source)
    VALUES (${text}, 'manual')
  `;
  revalidatePath('/');
}

/**
 * Delete a fact by ID
 */
export async function deleteFact(id: number) {
  await sql`DELETE FROM dog_facts WHERE id = ${id}`;
  revalidatePath('/');
}

/**
 * Reseed breeds (optional admin action)
 */
export async function reseedBreeds() {
  revalidatePath('/seed');
}
