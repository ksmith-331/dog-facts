'use client';

import { useState } from 'react';

export default function HomePage() {
  const [fact, setFact] = useState('');

  const getFact = async () => {
    const res = await fetch('/api/facts/random', { method: 'POST' });
    const data = await res.json();
    setFact(data.ok ? data.fact.text : 'No facts available. Run seed first.');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dogs Dashboard</h1>
      <button
        onClick={getFact}
        className="px-4 py-2 rounded bg-primary text-primary-contrast"
      >
        Create random dog fact
      </button>
      {fact && <p className="italic">{fact}</p>}
    </div>
  );
}
