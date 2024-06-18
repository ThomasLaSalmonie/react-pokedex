import Link from "next/link";
import "./card.css"

export default function PokemonCard(props) {
  return (
    <Link href={`/pokemons/${props.pokemon.name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <div>
          <img src={props.pokemon.image} alt={props.pokemon.name} />
          <h2>{props.pokemon.name}</h2>
        </div>
      </div>
    </Link>
  )
}