// src/pokemon/pokemon.controller.ts
import { Controller, Get, Param, NotFoundException, HttpException, HttpStatus, BadRequestException, Logger } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonResponseDto } from './pokemon/dto/pokemon-response.dto';

@Controller('pokemon') // this means the handler will be at /pokemon
export class PokemonController {
  private readonly logger = new Logger(PokemonController.name);

  constructor(private readonly pokemonService: PokemonService) {}

  /**
   * Handles GET requests to /pokemon/:identifier
   * name or id
   */
  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string): Promise<PokemonResponseDto> {
    this.logger.log(`Received request for Pokémon with identifier: ${identifier}`);

    // Basic input validation for the identifier
    if (!identifier || identifier.trim() === '') {
      this.logger.warn('Received empty identifier.');
      throw new BadRequestException('Pokémon identifier cannot be empty.');
    }

    // The service will handle if it's a name or ID it can handle mixed type.
    try {
      const pokemonData = await this.pokemonService.findOneByIdentifier(identifier);
      return pokemonData;
    } catch (error) {
      // Re-throw known exceptions (NotFoundException, HttpException) from the service
      if (error instanceof NotFoundException || error instanceof HttpException) {
        throw error;
      }
      // Log and throw a generic internal server error for unexpected issues
      this.logger.error(`Unhandled error in PokemonController for identifier "${identifier}":`, error);
      throw new HttpException('An internal server error occurred while processing your request.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
