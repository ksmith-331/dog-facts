'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/app/lib/db';

// Refresh the homepage fact
export async function refreshFact() {
  // Just revalidate the homepage so it fetches a new random fact
  revalidatePath('/');
}

