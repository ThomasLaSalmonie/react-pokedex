'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './page.css';
import { pokeApi, evolutionApi } from '@/utils/pokeapi';
import PokemonCard from '@/components/card';

export default function PokemonDetail({ params }: { params: { name: string } }) {
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllRelatedPokemons = async (chainLink) => {
    const species = await pokeApi.getPokemonByName(chainLink.species.name);
    const results = [{ name: chainLink.species.name, image: species.sprites.front_default}];
    for (const childChainLink of chainLink.evolves_to) {
      const childSpecies = await getAllRelatedPokemons(childChainLink);
      results.push(...childSpecies);
    }
    return results;
  }
  const fetchPokemonDetails = async (name: string) => {
    try {
      const response = await pokeApi.getPokemonByName(name);
      setPokemon(response);
      setLoading(false);
      const recentItems = JSON.parse(localStorage.getItem("pokemons") || "[]") as any[];
      const existedItem = recentItems.find(item => item.name === response.name);
      if (existedItem) {
        const indexOf = recentItems.indexOf(existedItem);
        recentItems.splice(indexOf, 1);
      }
      recentItems.splice(0, 0, {name: response.name, image: response.sprites.front_default});
      recentItems.splice(5, Infinity);
      localStorage.setItem("pokemons", JSON.stringify(recentItems));

      const species = await pokeApi.getPokemonSpeciesByName(response.species.name);

      const linkId = species.evolution_chain?.url.match(/\/(\d+)\/$/) ?? [];
      if (linkId[1]) {
        const evolutionLink = await evolutionApi.getEvolutionChainById(parseInt(linkId[1]));
        const allEvolution = await getAllRelatedPokemons(evolutionLink.chain);
        setEvolutionChain(allEvolution.filter(evolution => evolution.name !== response.name));
      }
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails(params.name);
  }, [params.name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div className="pokemon-detail">
      <div>
        <Link href="/pokemons" className="back-link">Back to Pokedex</Link>
        <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
        <img className="w-48 h-48 mx-auto" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className='audio'>
          <audio controls>
            <source src={pokemon.cries.latest} type="audio/ogg" />
          </audio>
        </div>
        <div className="pokemon-info text-left inline-block mt-4">
          <p className="text-lg"><strong>Height:</strong> {pokemon.height}</p>
          <p className="text-lg"><strong>Weight:</strong> {pokemon.weight}</p>
          <p className="text-lg flex"><strong>Types:</strong>
            {pokemon.types.map(typeInfo => (
              <img className="pokemon-type" key={typeInfo.type.name} src={`/types/${typeInfo.type.name}.svg`} />
            ))}
          </p>
          <p className="text-lg"><strong>Abilities:</strong> {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
        </div>
        <div>
          {evolutionChain.length > 0 ? (
            <div>
              <strong>Related:</strong>
              <div className='flex justify-center'>
                {evolutionChain.map(evolution => (
                  <div key={evolution.name}>
                    <PokemonCard pokemon={evolution} />
                  </div>
                ))}
              </div>
            </div>
          ) : ''}
        </div>
      </div>
    </div>
  );
};
