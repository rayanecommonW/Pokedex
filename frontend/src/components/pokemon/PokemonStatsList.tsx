// Lists Pokémon base stats

import React from 'react';
import type { PokemonStatInfo } from '../../models/pokemon.models'; // Adjust path
 // Adjust path

interface PokemonStatsListProps {
  stats: PokemonStatInfo[];
}

const PokemonStatsList: React.FC<PokemonStatsListProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return <p>No stats listed.</p>;
  return (
    <div className="my-4">
      <strong className="block text-sm font-medium text-gray-700 mb-1">Base Stats:</strong>
      <ul className="space-y-1">
        {stats.map((statInfo) => (
          <li key={statInfo.stat.name} className="text-sm text-gray-600 capitalize">
            {statInfo.stat.name.replace('-', ' ')}: {statInfo.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonStatsList;