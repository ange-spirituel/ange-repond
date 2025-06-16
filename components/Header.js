// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-700">👼 Ange Répond</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-purple-700">Accueil</Link>
        <Link href="/ask" className="text-gray-700 hover:text-purple-700">Poser une Question</Link>
      </nav>
    </header>
  );
}
