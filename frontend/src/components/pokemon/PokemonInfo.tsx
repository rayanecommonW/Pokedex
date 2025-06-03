// Displays basic info like height, weight

import React from 'react';

interface PokemonInfoProps {
  height: number; // in decimetres
  weight: number; // in hectograms
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ height, weight }) => {
  return (
    <div className="text-sm text-gray-600 space-y-1 my-4">
      <p><strong className="font-medium text-gray-700">Height:</strong> {height / 10} m</p>
      <p><strong className="font-medium text-gray-700">Weight:</strong> {weight / 10} kg</p>
    </div>
  );
};

export default PokemonInfo;