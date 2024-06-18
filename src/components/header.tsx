import Link from 'next/link';
import React from 'react';

export default function Header () {
  return (
    <header className="bg-black shadow-md fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto p-4 flex items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Home
        </Link>
      </nav>
    </header>
  );
};