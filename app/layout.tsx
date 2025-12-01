// app/layout.tsx
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-emerald-50 text-slate-900">
        {/* Sidebar */}
        <aside className="w-64 bg-green-800 text-white flex flex-col p-6">
          <h1 className="text-xl font-bold mb-6">Dog Dashboard</h1>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="hover:text-amber-200">🐾 Fun Facts</Link>
            <Link href="/breeds" className="hover:text-amber-200">🔍 Search Breeds</Link>
            <Link href="/seed" className="hover:text-amber-200">🌱 Seed DB</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
