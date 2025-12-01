// app/page.tsx
import { getRandomFact, getRandomPhoto } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const fact = await getRandomFact();
  const photo = await getRandomPhoto();

  // server action to refresh the fact
  async function refreshFact() {
    'use server';
    revalidatePath('/');
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Home page header only */}
      <h1 className="text-3xl font-bold text-leaf mb-4">Welcome to Dog Facts</h1>

      {/* Refresh button */}
      <form action={refreshFact} className="mt-4">
        <button className="rounded bg-moss text-forest px-4 py-2 font-bold shadow hover:bg-leaf transition">
          Create random dog fact
        </button>
      </form>

      {/* Fact display */}
      <p className="mt-4 text-leaf">
        {fact ?? 'Seed facts to get started.'}
      </p>
      <br />
      <img
          src={photo}
          className="w-48 h-48 object-cover rounded-lg border-2 border-leaf shadow-md mb-6"
        />
    </main>
  );
}
