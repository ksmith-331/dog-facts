// app/page.tsx
import { getRandomFact } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const fact = await getRandomFact();

  async function refreshFact() {
    'use server';
    revalidatePath('/');
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-green-800">Dog Facts</h1>
      <form action={refreshFact} className="mt-4">
        <button className="rounded bg-green-700 text-white px-4 py-2 hover:bg-green-600">
          Create random dog fact
        </button>
      </form>
      <p className="mt-2 text-slate-700">{fact ?? 'Seed facts to get started.'}</p>

    </main>
  );
}
