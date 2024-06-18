'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import './page.css';
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
    <div className="pokedex">
      <h1 className='text-4xl font-bold capitalize'>Pokedex</h1>
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={fetchPokemon}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>All Pokémon loaded</p>}
      >
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} key={index} />
        ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};