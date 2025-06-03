// Lists Pokémon types

import React from 'react';
import type { PokemonTypeInfo } from '../../models/pokemon.models';

interface PokemonTypesListProps {
  types: PokemonTypeInfo[];
}

const PokemonTypesList: React.FC<PokemonTypesListProps> = ({ types }) => {
  if (!types || types.length === 0) return <p>No types listed.</p>;
  return (
        <div className="mb-4"> {/* Added a bottom margin for spacing below this component */}
          <strong className="block text-sm font-medium text-gray-700 mb-1">Types:</strong>
          <ul className="flex flex-wrap gap-2 mt-1">
            {types.map((typeInfo) => (
              <li
                key={typeInfo.type.name}
                className={`type-${typeInfo.type.name.toLowerCase()} px-2.5 py-1 rounded-md border border-gray-300 bg-gray-100 capitalize text-xs font-medium`}
              >
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>
  );
};
export default PokemonTypesList;