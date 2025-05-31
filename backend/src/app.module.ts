// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module'; // Ensure this line is present

@Module({
  imports: [PokemonModule], // And PokemonModule is in the imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}