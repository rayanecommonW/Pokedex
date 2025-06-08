// This service will handle communication with our NestJS backend

import axios, { AxiosError } from 'axios';
import { PokemonResponseDto } from '../../../backend/src/pokemon/dto/pokemon-response.dto'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Fetches Pokémon data from our NestJS backend.
 * @returns A Promise resolving to the Pokémon data.$
 */
export const fetchPokemonFromBackend = async (identifier: string): Promise<PokemonResponseDto> => {
  if (!identifier || identifier.trim() === '') {
    throw new Error('Pokémon name or ID cannot be empty.');
  }
  try {
    const response = await axios.get<PokemonResponseDto>(`${API_BASE_URL}/pokemon/${identifier.toLowerCase().trim()}`);
    return response.data;



    //Error Management
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string; statusCode?: number }>;
    if (axiosError.isAxiosError && axiosError.response) {
      const backendErrorMessage = axiosError.response.data?.message;
      const status = axiosError.response.status;
      if (backendErrorMessage) {
        throw new Error(`Error ${status}: ${backendErrorMessage}`);
      }
      throw new Error(`Error fetching Pokémon: Server responded with status ${status}.`);
    }
    console.error("API Fetch Error:", error);
    throw new Error('An unexpected error occurred while fetching Pokémon data. Check console for details.');
  }
};