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
    <div className="pokemon-search-interface" style={{ padding: '20px', maxWidth: '500px', margin: '20px auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Pokédex</h1>
      <div className="search-controls" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Pokémon Name or ID"
          style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSearch} 
          disabled={loading || !searchTerm.trim()}
          style={{ padding: '10px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#3498db', color: 'white', cursor: 'pointer' }}
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