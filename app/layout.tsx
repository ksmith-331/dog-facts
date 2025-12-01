// app/layout.tsx
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-forest text-leaf min-h-screen flex">
        <nav className="w-64 bg-bark text-leaf p-6 space-y-6 shadow-lg">
          <h2 className="text-2xl font-bold tracking-wide">🐾 Dog Facts</h2>
          <div className="space-y-2">
            <Link href="/" className="block hover:text-sky transition">Home</Link>
            <Link href="/breeds" className="block hover:text-sky transition">Breeds</Link>
            <Link href="/about" className="block hover:text-sky transition">About</Link>
          </div>
        </nav>
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
