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
    <div className="pokemon-stats">
      <strong>Base Stats:</strong>
      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {stats.map((statInfo) => (
          <li key={statInfo.stat.name} style={{textTransform: 'capitalize'}}>
            {statInfo.stat.name.replace('-', ' ')}: {statInfo.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PokemonStatsList;