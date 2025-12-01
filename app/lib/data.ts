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
export async function getRandomFact(): Promise<string> {
  try {
    const res = await fetch('https://dogapi.dog/api/v2/facts', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Fact API failed: ${res.status}`);
    }

    const json = await res.json();
    const fact = json.data?.[0]?.attributes?.body ?? 'No fact available';
    return fact;
  } catch (err: any) {
    console.error('Fact fetch error:', err);
    return 'Could not fetch a fact right now';
  }
}

export async function getRandomPhoto(): Promise<string> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Photo API failed: ${res.status}`);
    }

    const json = await res.json();
    // Dog CEO API returns the image URL in the "message" field
    return json.message as string;
  } catch (err: any) {
    console.error('Image fetch error:', err);
    return '';
  }
}

// Search breeds by keyword
export async function searchBreeds(keyword: string) {
  const rows = await sql`
    SELECT 
      b.id, 
      b.name, 
      b.slug,
      (SELECT url FROM breed_images WHERE breed_id = b.id LIMIT 1) AS image_url
    FROM breeds b
    WHERE b.name ILIKE ${'%' + keyword + '%'}
    ORDER BY b.name ASC
    LIMIT 50
  `;
  return rows;
}


// Get a breed by slug (detail page)
export async function getBreedBySlug(slug: string) {
  const rows = await sql`
   SELECT 
    b.id,
    b.name,
    b.slug,
    b.description,
    b.temperament,
    b.life_span,
    b.height_cm,
    b.weight_kg,
    b.breed_group,
    b.reference_image_id,
    (SELECT url FROM breed_images WHERE breed_id = b.id LIMIT 1) AS image_url
  FROM breeds b
  WHERE b.slug = ${slug}
  LIMIT 1
  `;
  return rows[0] ?? null;
}



