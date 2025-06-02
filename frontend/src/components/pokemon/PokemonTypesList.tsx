// Lists Pokémon types

import React from 'react';
import type { PokemonTypeInfo } from '../../models/pokemon.models'; // Adjust path
 // Adjust path

interface PokemonTypesListProps {
  types: PokemonTypeInfo[];
}

const PokemonTypesList: React.FC<PokemonTypesListProps> = ({ types }) => {
  if (!types || types.length === 0) return <p>No types listed.</p>;
  return (
    <div className="pokemon-types">
      <strong>Types:</strong>
      <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {types.map((typeInfo) => (
          <li key={typeInfo.type.name} className={`type-${typeInfo.type.name.toLowerCase()}`}
              style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', textTransform: 'capitalize' }}>
            {typeInfo.type.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonTypesList;