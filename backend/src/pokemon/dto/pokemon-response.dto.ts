// This DTO helps in standardizing the response format and provides clear typing.


export class PokemonResponseDto {
  id: number;
  name: string;
  types: { // Array of Pokémon types
    slot: number;
    type: {
      name: string;
      url: string;
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
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  height: number;
  weight: number;
  abilities: { // Array of Pokémon abilities
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean; // True if this is a hidden ability
    slot: number;
  }[];
  stats: { // Array of base stats for the Pokémon
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;  
    };
  }[];
}