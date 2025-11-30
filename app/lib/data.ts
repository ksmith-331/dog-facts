// app/lib/data.ts
import { sql } from '@/app/lib/db';

export type Breed = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  temperament: string | null;
  origin: string | null;
  life_span: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  image_url?: string | null;
};

// Fetch a random fact (for homepage button)
export async function getRandomFact(): Promise<string | null> {
  if (!sql) return null;
  try {
    const facts = await sql<{ text: string }[]>`SELECT text FROM dog_facts ORDER BY random() LIMIT 1`;
    return facts[0]?.text ?? null;
  } catch (error: any) {
    if (error.code === '42P01') return null; // table not created yet
    throw error;
  }
}

// Search breeds by keyword
export async function searchBreeds(keyword: string): Promise<Breed[]> {
  if (!sql) return [];
  try {
    const rows = await sql<Breed[]>`
      SELECT b.*, (SELECT url FROM breed_images WHERE breed_id = b.id LIMIT 1) AS image_url
      FROM breeds b
      WHERE b.name ILIKE ${'%' + keyword + '%'} OR b.description ILIKE ${'%' + keyword + '%'}
      ORDER BY b.name ASC
      LIMIT 50
    `;
    return rows;
  } catch (error: any) {
    if (error.code === '42P01') return [];
    throw error;
  }
}

// Get a breed by slug (detail page)
export async function getBreedBySlug(slug: string): Promise<Breed | null> {
  if (!sql) return null;
  try {
    const rows = await sql<Breed[]>`
      SELECT b.*, (SELECT url FROM breed_images WHERE breed_id = b.id LIMIT 1) AS image_url
      FROM breeds b
      WHERE b.slug = ${slug}
      LIMIT 1
    `;
    return rows[0] ?? null;
  } catch (error: any) {
    if (error.code === '42P01') return null;
    throw error;
  }
}
