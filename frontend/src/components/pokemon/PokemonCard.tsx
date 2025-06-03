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
    <div className="border border-gray-200 rounded-xl p-5 mt-6 bg-white shadow-xs">
      <h2 className="text-center capitalize text-xl font-medium text-gray-700 mb-3">
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