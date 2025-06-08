// i might not need this if i import the dto from backend

export interface PokemonTypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSpriteDetails {
  front_default: string | null;
  other?: {
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
}

export interface PokemonAbilityInfo {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStatInfo {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonResponseDto {
  id: number;
  name: string;
  types: PokemonTypeInfo[];
  sprites: PokemonSpriteDetails;
  height: number;
  weight: number;
  abilities: PokemonAbilityInfo[];
  stats: PokemonStatInfo[];
}