// Lists Pokémon abilities

import React from 'react';
import type { PokemonAbilityInfo } from '../../models/pokemon.models'; // Adjust path

interface PokemonAbilitiesListProps {
  abilities: PokemonAbilityInfo[];
}

const PokemonAbilitiesList: React.FC<PokemonAbilitiesListProps> = ({ abilities }) => {
  if (!abilities || abilities.length === 0) return <p>No abilities listed.</p>;
  return (
    <div className="pokemon-abilities">
      <strong>Abilities:</strong>
      <ul style={{ listStylePosition: 'inside', paddingLeft: '0' }}>
        {abilities.map((abilityInfo) => (
          <li key={abilityInfo.ability.name} style={{textTransform: 'capitalize'}}>
            {abilityInfo.ability.name}
            {abilityInfo.is_hidden ? ' (Hidden)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonAbilitiesList;