// Lists Pokémon abilities

import React from 'react';
import type { PokemonAbilityInfo } from '../../models/pokemon.models';

interface PokemonAbilitiesListProps {
  abilities: PokemonAbilityInfo[];
}

const PokemonAbilitiesList: React.FC<PokemonAbilitiesListProps> = ({ abilities }) => {
  if (!abilities || abilities.length === 0) return <p>No abilities listed.</p>;
  return (
    <div className="my-4">
      <strong className="block text-sm font-medium text-gray-700 mb-1">Abilities:</strong>
      <ul className="list-disc list-inside space-y-0.5">
        {abilities.map((abilityInfo) => (
          <li key={abilityInfo.ability.name} className="text-sm text-gray-600 capitalize">
            {abilityInfo.ability.name}
            {abilityInfo.is_hidden ? ' (Hidden)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonAbilitiesList;