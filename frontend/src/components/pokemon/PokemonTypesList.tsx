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
          <strong className="font-semibold text-gray-700">Types:</strong>
          <ul className="flex flex-wrap gap-2 mt-1">
            {types.map((typeInfo) => (
              <li
                key={typeInfo.type.name}
                className={`type-${typeInfo.type.name.toLowerCase()} px-2 py-0.5 rounded border border-gray-300 capitalize text-sm`}
              >
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>
  );
};
export default PokemonTypesList;