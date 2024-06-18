import { PokemonClient, EvolutionClient } from 'pokenode-ts';

const pokeApi = new PokemonClient();
const evolutionApi = new EvolutionClient();

export { pokeApi, evolutionApi};