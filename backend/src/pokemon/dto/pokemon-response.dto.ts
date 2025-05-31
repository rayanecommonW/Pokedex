// src/pokemon/dto/pokemon-response.dto.ts

/**
 * Defines the structure of the Pokémon data that our API will return.
 * This DTO helps in standardizing the response format and provides clear typing.
 */
export class PokemonResponseDto {
  id: number;
  name: string;
  types: { // Array of Pokémon types
    slot: number;
    type: {
      name: string; // Name of the type (e.g., "grass", "poison")
      url: string;  // URL to the type resource in PokeAPI
    };
  }[];
  sprites: { // Object containing various Pokémon sprite URLs
    front_default: string | null; // Default front-facing sprite
    other?: { // Contains alternative sprite categories
      dream_world?: {
        front_default: string | null;
      };
      home?: {
        front_default: string | null;
      };
      'official-artwork'?: { // Preferred high-quality artwork
        front_default: string | null;
      };
    };
  };
  height: number; // Height in decimetres (e.g., 7 means 0.7m)
  weight: number; // Weight in hectograms (e.g., 69 means 6.9kg)
  abilities: { // Array of Pokémon abilities
    ability: {
      name: string; // Name of the ability (e.g., "overgrow")
      url: string;  // URL to the ability resource in PokeAPI
    };
    is_hidden: boolean; // True if this is a hidden ability
    slot: number;
  }[];
  stats: { // Array of base stats for the Pokémon
    base_stat: number; // The base value of the stat (e.g., 45 for HP)
    effort: number;    // The effort value (EV) yield for this stat
    stat: {
      name: string; // Name of the stat (e.g., "hp", "attack")
      url: string;  // URL to the stat resource in PokeAPI
    };
  }[];
}