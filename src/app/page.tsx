'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import PokemonCard from '@/components/card';

interface Pokemon {
  name: string;
  image: string;
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    // getting stored value
    const saved = localStorage.getItem("pokemons") || "[]";
    const initialValue = JSON.parse(saved);
    setPokemonList(initialValue);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href={`/pokemons`} className="m-2">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <Image
            className="mx-auto"
            width={300}
            height={300}
            src="/pokeball_1.png"
            alt="pokeball"
          />
          <h2 className="text-xl font-semibold mt-2 capitalize">Pokedex</h2>
        </div>
      </Link>
      Last Pokemons:
      <div className="flex-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} key={index} />
        ))}
      </div>
    </main>
  );
}
