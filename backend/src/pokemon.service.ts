// src/pokemon/pokemon.service.ts
import { Injectable, NotFoundException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { PokemonResponseDto } from './pokemon/dto/pokemon-response.dto';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name); // Logger for this service
  private readonly pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches Pokémon data from the PokeAPI by its name or ID.
   * @param identifier The name (string) or ID (number) of the Pokémon.
   * @returns A Promise resolving to the Pokémon data structured as PokemonResponseDto.
   * @throws NotFoundException if the Pokémon is not found in PokeAPI.
   * @throws HttpException for other API request failures or unexpected errors.
   */
  async findOneByIdentifier(identifier: string | number): Promise<PokemonResponseDto> {
    const lookupIdentifier = typeof identifier === 'string' ? identifier.toLowerCase() : identifier;
    const url = `${this.pokeApiBaseUrl}${lookupIdentifier}`;
    this.logger.log(`Fetching Pokémon from PokeAPI: ${url}`);

    try {
      // Use firstValueFrom to convert Observable to Promise for async/await
      const { data: rawPokemonData } = await firstValueFrom(
        this.httpService.get<any>(url).pipe( // Specify <any> for now, as PokeAPI has a very complex structure
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              this.logger.warn(`Pokemon with identifier "${lookupIdentifier}" not found at PokeAPI.`);
              throw new NotFoundException(`Pokemon with identifier "${lookupIdentifier}" not found.`);
            }
            // Log detailed error information from PokeAPI
            this.logger.error(`PokeAPI request failed for identifier "${lookupIdentifier}": Status ${error.response?.status}`, error.response?.data || error.message);
            throw new HttpException(
              'Failed to fetch data from PokeAPI',
              HttpStatus.SERVICE_UNAVAILABLE, // More specific error for external service issues
            );
          }),
        ),
      );

      // Map the raw data from PokeAPI to our PokemonResponseDto.
      // This transformation step is crucial for decoupling our API from the external API's structure
      // and for selecting only the data we need.
      const pokemonData: PokemonResponseDto = {
        id: rawPokemonData.id,
        name: rawPokemonData.name,
        types: rawPokemonData.types, // Assuming structure matches; could be further refined
        sprites: { // Select specific sprites, prioritizing official artwork
            front_default: rawPokemonData.sprites.front_default,
            other: {
                dream_world: rawPokemonData.sprites.other?.dream_world,
                home: rawPokemonData.sprites.other?.home,
                'official-artwork': rawPokemonData.sprites.other?.['official-artwork'],
            }
        },
        height: rawPokemonData.height,
        weight: rawPokemonData.weight,
        abilities: rawPokemonData.abilities, // Assuming structure matches
        stats: rawPokemonData.stats,         // Assuming structure matches
      };
      this.logger.log(`Successfully fetched and transformed data for Pokémon: ${pokemonData.name} (#${pokemonData.id})`);
      return pokemonData;

    } catch (error) {
      // Handle errors already processed (NotFoundException, HttpException from catchError)
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      // Catch any other unexpected errors
      this.logger.error(`Unexpected error in findOneByIdentifier for "${lookupIdentifier}":`, error);
      throw new HttpException(
        'An unexpected internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}