// Displays all details of a Pokémon

import React from 'react';
import type { PokemonResponseDto } from '../../models/pokemon.models';
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
    <div className="max-w-sm mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg bg-white border-4 border-black">
      {/* Wrapper en position relative pour le Pokéball */}
      <div className="relative">
        {/* 1) Demi-cercle rouge (top) - plus petit que précédemment */}
        <div className="bg-red-600 w-full h-20 rounded-t-2xl"></div>

        {/* 2) Trait noir central */}
        <div className="absolute top-20 left-0 w-full h-2 bg-black"></div>

        {/* 3) Bouton Pokéball centré - rapproché */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-black rounded-full shadow-lg flex items-center justify-center
                     hover:scale-110 transition-transform duration-200"
          style={{ top: '3.75rem' }} // aligner le centre du bouton sur le trait noir
        >
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
      </div>

      {/* 4) Contenu blanc - moins de padding pour réduire l’espace */}
      <div className="pt-28 px-5 pb-6 text-gray-800">
        {/* Image du Pokémon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-xl p-4 shadow-md">
            <PokemonImage sprites={pokemon.sprites} altName={pokemon.name} />
          </div>
        </div>

        {/* Nom + ID */}
        <h2 className="text-center capitalize text-2xl font-bold mb-3">
          {pokemon.name} <span className="text-lg text-gray-600">#{pokemon.id}</span>
        </h2>

        {/* Infos basiques (taille, poids) */}
        <div className="mb-3">
          <PokemonInfo height={pokemon.height} weight={pokemon.weight} />
        </div>

        {/* Types */}
        <div className="mb-3">
          <PokemonTypesList types={pokemon.types} />
        </div>

        {/* Capacités */}
        <div className="mb-3">
          <PokemonAbilitiesList abilities={pokemon.abilities} />
        </div>

        {/* Stats */}
        <div>
          <PokemonStatsList stats={pokemon.stats} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
