import Link from "next/link";
import Image from "next/image";
import "./card.css"

export default function PokemonCard(props: { pokemon: { name: string; image: string;}}) {
  return (
    <Link href={`/pokemons/${props.pokemon.name}`} className="pokemon-card pokemon-card-link">
      <div>
        <div>
          <Image width="200" height="200" src={props.pokemon.image} alt={props.pokemon.name} />
          <h2>{props.pokemon.name}</h2>
        </div>
      </div>
    </Link>
  )
}