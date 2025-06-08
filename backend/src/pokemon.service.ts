// src/pokemon/pokemon.service.ts
import { Injectable, NotFoundException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { PokemonResponseDto } from './pokemon/dto/pokemon-response.dto';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name); // Logger for this service
  private readonly pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/'; // could put this in .env ngl

  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches Pokémon data from the PokeAPI by its name or ID.
   */
  async findOneByIdentifier(identifier: string | number): Promise<PokemonResponseDto> {
    const lookupIdentifier = typeof identifier === 'string' ? identifier.toLowerCase() : identifier;
    const url = `${this.pokeApiBaseUrl}${lookupIdentifier}`;
    this.logger.log(`Fetching Pokémon from PokeAPI: ${url}`);

    try {
      // Use firstValueFrom to convert Observable to Promise for async/await
      const { data: rawPokemonData } = await firstValueFrom(
        this.httpService.get<any>(url).pipe( // Specify <any> for now, as PokeAPI has a very complex structure
          
          // Classic error handling
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              this.logger.warn(`Pokemon with identifier "${lookupIdentifier}" not found at PokeAPI.`);
              throw new NotFoundException(`Pokemon with identifier "${lookupIdentifier}" not found.`);
            }
            this.logger.error(`PokeAPI request failed for identifier "${lookupIdentifier}": Status ${error.response?.status}`, error.response?.data || error.message);
            throw new HttpException(
              'Failed to fetch data from PokeAPI',
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          }),
        ),
      );

      // Map the raw data from PokeAPI to our PokemonResponseDto.
      const pokemonData: PokemonResponseDto = {
        id: rawPokemonData.id,
        name: rawPokemonData.name,
        types: rawPokemonData.types,
        sprites: {
            front_default: rawPokemonData.sprites.front_default,
            other: {
                dream_world: rawPokemonData.sprites.other?.dream_world,
                home: rawPokemonData.sprites.other?.home,
                'official-artwork': rawPokemonData.sprites.other?.['official-artwork'],
            }
        },
        height: rawPokemonData.height,
        weight: rawPokemonData.weight,
        abilities: rawPokemonData.abilities,
        stats: rawPokemonData.stats,
      };

      // More logging
      this.logger.log(`Successfully fetched and transformed data for Pokémon: ${pokemonData.name} (#${pokemonData.id})`);
      return pokemonData;

    } catch (error) {
      
      // More error handling
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Unexpected error in findOneByIdentifier for "${lookupIdentifier}":`, error);
      throw new HttpException(
        'An unexpected internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}