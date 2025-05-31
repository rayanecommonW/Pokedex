// src/pokemon/pokemon.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { PokemonController } from '../pokemon.controller';
import { PokemonService } from '../pokemon.service';

@Module({
  imports: [
    HttpModule.register({ // Configure HttpModule globally for this module
      timeout: 5000,       // Optional: Set a timeout for HTTP requests (milliseconds)
      maxRedirects: 5,     // Optional: Set maximum number of redirects to follow
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService], // PokemonService will use HttpService from HttpModule
})
export class PokemonModule {}