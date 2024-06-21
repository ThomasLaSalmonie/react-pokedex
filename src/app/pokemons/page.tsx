'use client'

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { pokeApi } from '@/utils/pokeapi';
import PokemonCard from '@/components/card';

interface Pokemon {
  name: string;
  image: string;
};

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchPokemon = async () => {
    try {
      const response = await pokeApi.listPokemons(offset, 30);
      const pokemonData = await Promise.all(
        response.results.map(async (pokemon) => {
          const pokemonRecord = await pokeApi.getPokemonByName(pokemon.name);
          return { name: pokemon.name, image: pokemonRecord.sprites?.front_default || '' };
        })
      );
      setPokemonList([...pokemonList, ...pokemonData]);
      setOffset(offset + 30);
      setLoading(false);
      if (response.results.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading && pokemonList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className='text-4xl font-bold capitalize'>Pokedex</h1>
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={fetchPokemon}
        hasMore={hasMore}
        loader={<button className="w-24 justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={() => fetchPokemon()}>Load more</button>}
        endMessage={<p style={{ textAlign: 'center' }}>All Pokémon loaded</p>}
      >
      <div className="flex flex-wrap justify-center">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} key={index} />
        ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};