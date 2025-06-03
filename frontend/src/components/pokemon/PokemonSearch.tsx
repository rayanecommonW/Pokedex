// Main search interface

import React, { useState, useCallback } from 'react';
import { fetchPokemonFromBackend } from '../../services/api';
import type { PokemonResponseDto } from '../../models/pokemon.models'; // Adjust path
import PokemonCard from './PokemonCard';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';

const PokemonSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pokemon, setPokemon] = useState<PokemonResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback to memoize the handleSearch function
  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a Pokémon name or ID.');
      setPokemon(null);
      return;
    }
    setLoading(true);
    setError(null);
    setPokemon(null); // Clear previous Pokémon data
    try {
      const data = await fetchPokemonFromBackend(searchTerm);
      setPokemon(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while fetching Pokémon.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]); // Dependency: re-create if searchTerm changes (though it's used on trigger)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-5 max-w-xl mx-auto shadow-md rounded-lg">
      <h1 className="text-center text-3xl font-bold mb-6">Pokédex</h1>
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Pokémon Name or ID"
          className="flex-grow p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className="px-4 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {pokemon && !loading && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default PokemonSearch;