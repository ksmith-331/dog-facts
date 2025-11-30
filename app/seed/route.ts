// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@/app/lib/db';

// Helpers to create slugs
const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function POST() {
  if (!sql) return NextResponse.json({ ok: false, error: 'DB not configured' }, { status: 500 });

  try {
    // 1) Seed breeds list
    const breedsRes = await fetch('https://publicapi.dev/dogs-api/breeds/list', { cache: 'no-store' });
    const breedsJson = await breedsRes.json(); // Expect an array or object with breed names (depends on API)

    // Normalize to an array of names
    const breedNames: string[] = Array.isArray(breedsJson) ? breedsJson : Object.values(breedsJson ?? {}).flat();

    for (const name of breedNames) {
      const slug = toSlug(name);
      // Upsert the breed record
      await sql`
        INSERT INTO breeds (name, slug)
        VALUES (${name}, ${slug})
        ON CONFLICT (name) DO NOTHING
      `;

      // 2) Fetch breed details
      const infoRes = await fetch(`https://publicapi.dev/dogs-api/breeds/${encodeURIComponent(name)}`, { cache: 'no-store' });
      if (infoRes.ok) {
        const info = await infoRes.json();
        await sql`
          UPDATE breeds
          SET description = ${info.description ?? null},
              temperament = ${info.temperament ?? null},
              origin = ${info.origin ?? null},
              life_span = ${info.life_span ?? null},
              height_cm = ${info.height_cm ?? null},
              weight_kg = ${info.weight_kg ?? null}
          WHERE slug = ${slug}
        `;
        if (info.image_url) {
          // link image to breed
          const breed = await sql<{ id: number }[]>`SELECT id FROM breeds WHERE slug = ${slug} LIMIT 1`;
          if (breed[0]?.id) {
            await sql`
              INSERT INTO breed_images (breed_id, url)
              VALUES (${breed[0].id}, ${info.image_url})
              ON CONFLICT DO NOTHING
            `;
          }
        }
      }
    }

    // 3) Seed a batch of random facts
    // Call a few times to have data for the homepage button
    for (let i = 0; i < 10; i++) {
      const factRes = await fetch('https://publicapi.dev/dogs-api/random/fact', { cache: 'no-store' });
      if (factRes.ok) {
        const fact = await factRes.json();
        const text = typeof fact === 'string' ? fact : (fact.text ?? JSON.stringify(fact));
        await sql`
          INSERT INTO dog_facts (text, source)
          VALUES (${text}, 'publicapi.dev/dogs-api')
          ON CONFLICT DO NOTHING
        `;
      }
    }

    return NextResponse.json({ ok: true, breedsCount: breedNames.length, factsSeeded: 10 });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to seed data' }, { status: 500 });
  }
}
