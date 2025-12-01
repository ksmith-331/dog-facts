// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-forest text-leaf min-h-screen flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-bark text-leaf p-6 space-y-6 shadow-lg">
          <h2 className="text-2xl font-bold tracking-wide">🐾 Dog Facts</h2>
          <div className="space-y-2">
            <a href="/" className="block hover:text-sky transition">Home</a>
            <a href="/breeds" className="block hover:text-sky transition">Breeds</a>
            <a href="/about" className="block hover:text-sky transition">About</a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
