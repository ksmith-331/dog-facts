import { getRandomFact, getRandomPhoto } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

export default async function Home() {
  const fact = await getRandomFact();
  const photo = await getRandomPhoto();

  async function refreshFact() {
    'use server';
    revalidatePath('/');
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-leaf mb-4">Welcome to Dog Facts</h1>

      <form action={refreshFact} className="mt-4">
        <button className="rounded bg-moss text-forest px-4 py-2 font-bold shadow hover:bg-leaf transition">
          Create random dog fact
        </button>
      </form>

      <p className="mt-4 text-leaf">{fact ?? 'Seed facts to get started.'}</p>
      <br />
      {photo && (
        <Image
          src={photo}
          alt="Random dog"
          width={192}
          height={192}
          className="object-cover rounded-lg border-2 border-leaf shadow-md mb-6"
        />
      )}
    </main>
  );
}
