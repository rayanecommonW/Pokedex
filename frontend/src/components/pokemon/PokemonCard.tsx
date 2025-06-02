// Displays all details of a Pokémon

import React from 'react';
import type { PokemonResponseDto } from '../../models/pokemon.models'; // Adjust path
import PokemonImage from './PokemonImage';
import PokemonInfo from './PokemonInfo';
import PokemonTypesList from './PokemonTypesList';
import PokemonAbilitiesList from './PokemonAbilitiesList';
import PokemonStatsList from './PokemonStatsList';

interface PokemonCardProps {
  pokemon: PokemonResponseDto;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card-details" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginTop: '20px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', textTransform: 'capitalize', margin: '0 0 10px 0' }}>
        {pokemon.name} (#{pokemon.id})
      </h2>
      <PokemonImage sprites={pokemon.sprites} altName={pokemon.name} />
      <PokemonInfo height={pokemon.height} weight={pokemon.weight} />
      <PokemonTypesList types={pokemon.types} />
      <PokemonAbilitiesList abilities={pokemon.abilities} />
      <PokemonStatsList stats={pokemon.stats} />
    </div>
  );
};

export default PokemonCard;