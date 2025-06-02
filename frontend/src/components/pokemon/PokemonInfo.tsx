// Displays basic info like height, weight

import React from 'react';

interface PokemonInfoProps {
  height: number; // in decimetres
  weight: number; // in hectograms
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ height, weight }) => {
  return (
    <div className="pokemon-physical-info">
      <p><strong>Height:</strong> {height / 10} m</p>
      <p><strong>Weight:</strong> {weight / 10} kg</p>
    </div>
  );
};

export default PokemonInfo;