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
    <div className="border border-gray-200 rounded-lg p-4 mt-5 bg-gray-50">
      <h2 className="text-center capitalize text-lg font-semibold mb-2">
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