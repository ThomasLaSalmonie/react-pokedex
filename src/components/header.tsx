import Link from 'next/link';
import React from 'react';
import Avatar from './avatar';

export default function Header () {
  return (
    <header className="bg-black shadow-md fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Home
        </Link>
        <Link href="/pokemons" className="text-2xl font-bold text-white">
          Pokedex
        </Link>
        <Avatar />
      </nav>
    </header>
  );
};